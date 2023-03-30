window.SIDEBAR_ITEMS = {"enum":[["GetIfPackageHasNewVersionResult",""],["ProgrammingLanguage",""],["QueryPackageError",""]],"fn":[["download_and_unpack_targz","Whether the top-level directory should be stripped"],["get_all_available_registries",""],["get_all_installed_webc_packages","Returns a list of all installed webc packages"],["get_all_installed_webc_packages_inner",""],["get_all_local_packages","Returns a list of all locally installed packages"],["get_all_names_in_dir",""],["get_bytes",""],["get_checkouts_dir",""],["get_checksum_hash","The checksum of the webc file has a bunch of zeros at the end (it’s currently encoded that way in the webc format). This function strips the zeros because otherwise the filename would become too long."],["get_executable_file_from_path","Returns the (manifest, .wasm file name), given a package dir"],["get_local_package",""],["get_package_local_dir",""],["get_remote_webc_checksum","Returns the checksum of the .webc file, so that we can check whether the file is already installed before downloading it"],["get_remote_webc_manifest","Before fetching the entire file from a remote URL, just fetch the manifest so we can see if the package has already been installed"],["get_targz_bytes",""],["get_webc_bytes",""],["get_webc_dir",""],["install_package","Installs the .tar.gz if it doesn’t yet exist, returns the (package dir, entrypoint .wasm file path)"],["install_webc_package",""],["install_webc_package_inner",""],["list_bindings","List all bindings associated with a particular package."],["query_command_from_registry",""],["query_package_from_registry","Returns the download info of the packages, on error returns all the available packages i.e. ((“foo/python”, “wapm.io”), (“bar/python” “wapm.io”)))"],["setup_client",""],["test_if_registry_present",""],["try_finding_local_command",""],["try_unpack_targz","Convenience function that will unpack .tar.gz files and .tar.bz files to a target directory (does NOT remove the original .tar.gz)"],["unpack_sans_parent",""],["unpack_with_parent",""],["whoami",""]],"mod":[["api",""],["client",""],["config",""],["graphql",""],["interface",""],["login",""],["package",""],["publish",""],["types",""],["utils",""]],"static":[["GLOBAL_CONFIG_FILE_NAME",""],["PACKAGE_TOML_FALLBACK_NAME",""],["PACKAGE_TOML_FILE_NAME",""]],"struct":[["Bindings","A library that exposes bindings to a WAPM package."],["BindingsGenerator","The generator used to create [`Bindings`]."],["LocalPackage",""],["PackageDownloadInfo",""],["RegistryClient","API client for the Wasmer registry."],["RemoteWebcInfo",""]]};