import { ask } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import type { Update } from "@tauri-apps/plugin-updater";
import { describe, expect, it, vi } from "vitest";

import { checkUpdate } from "@/lib/updater";

vi.mock("@tauri-apps/plugin-dialog");
vi.mock("@tauri-apps/plugin-process");
vi.mock("@tauri-apps/plugin-updater");

function mockUpdate() {
  return {
    version: "1.2.3",
    downloadAndInstall: vi.fn().mockResolvedValue(undefined),
  } as unknown as Update;
}

describe("checkUpdate", () => {
  it("does not prompt when no update is available", async () => {
    vi.mocked(check).mockResolvedValue(null);

    await checkUpdate();

    expect(ask).not.toHaveBeenCalled();
    expect(relaunch).not.toHaveBeenCalled();
  });

  it("installs the update and relaunches when accepted", async () => {
    const update = mockUpdate();
    vi.mocked(check).mockResolvedValue(update);
    vi.mocked(ask).mockResolvedValue(true);

    await checkUpdate();

    expect(ask).toHaveBeenCalledWith(expect.stringContaining("1.2.3"));
    expect(update.downloadAndInstall).toHaveBeenCalledOnce();
    expect(relaunch).toHaveBeenCalledOnce();
  });

  it("does nothing when the update is declined", async () => {
    const update = mockUpdate();
    vi.mocked(check).mockResolvedValue(update);
    vi.mocked(ask).mockResolvedValue(false);

    await checkUpdate();

    expect(update.downloadAndInstall).not.toHaveBeenCalled();
    expect(relaunch).not.toHaveBeenCalled();
  });
});
