use log::LevelFilter;
use tauri_plugin_log::{Target, TargetKind, TimezoneStrategy};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
pub mod command;

#[cfg(debug_assertions)]
const LOG_TARGETS: [Target; 2] = [
    Target::new(TargetKind::Webview),
    Target::new(TargetKind::Stdout),
];
#[cfg(debug_assertions)]
const LOG_LEVEL: LevelFilter = LevelFilter::Debug;

#[cfg(not(debug_assertions))]
const LOG_TARGETS: [Target; 2] = [
    Target::new(TargetKind::Webview),
    Target::new(TargetKind::LogDir { file_name: None }),
];
#[cfg(not(debug_assertions))]
const LOG_LEVEL: LevelFilter = LevelFilter::Info;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .level(LOG_LEVEL)
                .targets(LOG_TARGETS)
                .timezone_strategy(TimezoneStrategy::UseLocal)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::default().build())
        .invoke_handler(tauri::generate_handler![command::greet::greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
