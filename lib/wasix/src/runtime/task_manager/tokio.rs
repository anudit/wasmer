use std::{
    pin::Pin,
    sync::{Arc, Mutex},
    time::Duration,
};

use futures::{future::BoxFuture, Future};
use tokio::runtime::Handle;

use crate::{os::task::thread::WasiThreadError, WasiFunctionEnv};

use super::{TaskWasm, TaskWasmRunProperties, VirtualTaskManager};

/// A task manager that uses tokio to spawn tasks.
#[derive(Clone, Debug)]
pub struct TokioTaskManager {
    handle: Handle,
    pool: Arc<rayon::ThreadPool>,
}

/// This holds the currently set shared runtime which should be accessed via
/// TokioTaskManager::shared() and/or set via TokioTaskManager::set_shared()
static GLOBAL_RUNTIME: Mutex<Option<(Arc<tokio::runtime::Runtime>, Handle)>> = Mutex::new(None);

impl TokioTaskManager {
    pub fn new(rt: Handle) -> Self {
        Self {
            handle: rt,
            pool: Arc::new(rayon::ThreadPoolBuilder::new().build().unwrap()),
        }
    }

    pub fn runtime_handle(&self) -> tokio::runtime::Handle {
        self.handle.clone()
    }

    /// Allows the caller to set the shared runtime that will be used by other
    /// async processes within Wasmer
    ///
    /// The shared runtime must be set before it is used and can only be set once
    /// otherwise this call will fail with an error.
    pub fn set_shared(rt: Arc<tokio::runtime::Runtime>) -> Result<(), anyhow::Error> {
        let mut guard = GLOBAL_RUNTIME.lock().unwrap();
        if guard.is_some() {
            return Err(anyhow::format_err!("The shared runtime has already been set or lazy initialized - it can not be overridden"));
        }
        guard.replace((rt.clone(), rt.handle().clone()));
        Ok(())
    }

    /// Shared tokio [`VirtualTaskManager`] that is used by default.
    ///
    /// This exists because a tokio runtime is heavy, and there should not be many
    /// independent ones in a process.
    pub fn shared() -> Self {
        if let Ok(handle) = tokio::runtime::Handle::try_current() {
            Self::new(handle)
        } else {
            let mut guard = GLOBAL_RUNTIME.lock().unwrap();
            let rt = guard.get_or_insert_with(|| {
                let rt = tokio::runtime::Runtime::new().unwrap();
                let handle = rt.handle().clone();
                (Arc::new(rt), handle)
            });
            Self::new(rt.1.clone())
        }
    }
}

impl Default for TokioTaskManager {
    fn default() -> Self {
        Self::shared()
    }
}

struct TokioRuntimeGuard<'g> {
    #[allow(unused)]
    inner: tokio::runtime::EnterGuard<'g>,
}
impl<'g> Drop for TokioRuntimeGuard<'g> {
    fn drop(&mut self) {}
}

impl VirtualTaskManager for TokioTaskManager {
    /// See [`VirtualTaskManager::sleep_now`].
    fn sleep_now(&self, time: Duration) -> Pin<Box<dyn Future<Output = ()> + Send + Sync>> {
        let (tx, mut rx) = tokio::sync::mpsc::unbounded_channel();
        self.handle.spawn(async move {
            if time == Duration::ZERO {
                tokio::task::yield_now().await;
            } else {
                tokio::time::sleep(time).await;
            }
            tx.send(()).ok();
        });
        Box::pin(async move {
            rx.recv().await;
        })
    }

    /// See [`VirtualTaskManager::task_shared`].
    fn task_shared(
        &self,
        task: Box<dyn FnOnce() -> BoxFuture<'static, ()> + Send + 'static>,
    ) -> Result<(), WasiThreadError> {
        self.handle.spawn(async move {
            let fut = task();
            fut.await
        });
        Ok(())
    }

    /// See [`VirtualTaskManager::task_wasm`].
    fn task_wasm(&self, task: TaskWasm) -> Result<(), WasiThreadError> {
        // Create the context on a new store
        let run = task.run;
        let (ctx, store) = WasiFunctionEnv::new_with_store(
            task.module,
            task.env,
            task.snapshot,
            task.spawn_type,
            task.update_layout,
        )?;

        // If we have a trigger then we first need to run
        // the poller to completion
        if let Some(trigger) = task.trigger {
            let trigger = trigger();
            let pool = self.pool.clone();
            self.handle.spawn(async move {
                let result = trigger.await;
                // Build the task that will go on the callback
                pool.spawn(move || {
                    // Invoke the callback
                    run(TaskWasmRunProperties {
                        ctx,
                        store,
                        trigger_result: Some(result),
                    });
                });
            });
        } else {
            // Run the callback on a dedicated thread
            self.pool.spawn(move || {
                // Invoke the callback
                run(TaskWasmRunProperties {
                    ctx,
                    store,
                    trigger_result: None,
                });
            });
        }
        Ok(())
    }

    /// See [`VirtualTaskManager::task_dedicated`].
    fn task_dedicated(
        &self,
        task: Box<dyn FnOnce() + Send + 'static>,
    ) -> Result<(), WasiThreadError> {
        self.pool.spawn(move || {
            task();
        });
        Ok(())
    }

    /// See [`VirtualTaskManager::thread_parallelism`].
    fn thread_parallelism(&self) -> Result<usize, WasiThreadError> {
        Ok(std::thread::available_parallelism()
            .map(usize::from)
            .unwrap_or(8))
    }
}