use tauri::{AppHandle, Manager};

pub fn run() {
    tauri::Builder::default()
        #[cfg(desktop)]
        {
            builder = builder.plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
                let _ = app.get_webview_window("main")
                    .expect("no main window")
                    .set_focus();
            }));
        }
        .setup(|app| {
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        })
        .plugin(tauri_plugin_notification::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
