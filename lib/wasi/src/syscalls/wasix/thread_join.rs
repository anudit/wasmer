use super::*;
use crate::syscalls::*;

/// ### `thread_join()`
/// Joins this thread with another thread, blocking this
/// one until the other finishes
///
/// ## Parameters
///
/// * `tid` - Handle of the thread to wait on
#[instrument(level = "debug", skip_all, fields(%join_tid), ret, err)]
pub fn thread_join<M: MemorySize + 'static>(
    mut ctx: FunctionEnvMut<'_, WasiEnv>,
    join_tid: Tid,
) -> Result<Errno, WasiError> {
    wasi_try_ok!(WasiEnv::process_signals_and_exit(&mut ctx)?);
    if handle_rewind::<M>(&mut ctx) {
        return Ok(Errno::Success);
    }

    let env = ctx.data();
    let tid: WasiThreadId = join_tid.into();
    let other_thread = env.process.get_thread(&tid);
    if let Some(other_thread) = other_thread {
        let res = __asyncify_with_deep_sleep_ext::<M, _, _, _>(
            ctx,
            None,
            async move {
                other_thread
                    .join()
                    .await
                    .map_err(|err| {
                        err.as_exit_code()
                            .unwrap_or(ExitCode::Errno(Errno::Unknown))
                    })
                    .unwrap_or_else(|a| a)
            },
            |_, _, _| Ok(()),
        )?;
        Ok(Errno::Success)
    } else {
        Ok(Errno::Success)
    }
}