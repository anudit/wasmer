window.SIDEBAR_ITEMS = {"macro":[["count_idents",""],["from_to_native_wasm_type",""],["from_to_native_wasm_type_same_size",""],["impl_host_function",""]],"mod":[["private","Sealing the HostFunctionKind because it shouldn’t be implemented by any type outside. See: https://rust-lang.github.io/api-guidelines/future-proofing.html#c-sealed"]],"struct":[["S0","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S1","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S10","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S11","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S12","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S13","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S14","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S15","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S16","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S17","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S18","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S19","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S2","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S20","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S21","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S22","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S23","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S24","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S25","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S26","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S3","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S4","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S5","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S6","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S7","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S8","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["S9","A structure with a C-compatible representation that can hold a set of Wasm values. This type is used by `WasmTypeList::CStruct`."],["StaticFunction","Represents a low-level Wasm static host function. See [`super::Function::new_typed`] and [`super::Function::new_typed_with_env`] to learn more."],["WithEnv","An empty struct to help Rust typing to determine when a `HostFunction` does have an environment."],["WithoutEnv","An empty struct to help Rust typing to determine when a `HostFunction` does not have an environment."]],"trait":[["FromToNativeWasmType","A trait to convert a Rust value to a `WasmNativeType` value, or to convert `WasmNativeType` value to a Rust value."],["HostFunction","The `HostFunction` trait represents the set of functions that can be used as host function. To uphold this statement, it is necessary for a function to be transformed into a pointer to `VMFunctionBody`."],["IntoResult","The `IntoResult` trait turns a `WasmTypeList` into a `Result<WasmTypeList, Self::Error>`."],["WasmTypeList","The `WasmTypeList` trait represents a tuple (list) of Wasm typed values. It is used to get low-level representation of such a tuple."]]};