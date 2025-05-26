import { ask } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";

export async function checkUpdate() {
  const update = await check();

  if (update) {
    const yes = await ask(
      `新しいバージョン（${update.version}）が利用可能です。\n今すぐ更新しますか？`,
    );

    if (yes) {
      await update.downloadAndInstall();
      await relaunch();
    }
  }
}
