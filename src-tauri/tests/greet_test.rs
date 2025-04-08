use tauri_app_lib::command::greet::greet;

#[test]
fn test_greet() {
    let result = greet("Tauri");
    assert_eq!(result, "Hello, Tauri! You've been greeted from Rust!");
}
