import ReactDOM from "react-dom/client";
import type { Root } from "react-dom/client";
import { describe, expect, it, vi } from "vite-plus/test";

import { checkUpdate } from "@/lib/updater";

vi.mock("@/lib/updater");
vi.mock("react-dom/client", () => ({
  default: {
    createRoot: vi.fn<typeof ReactDOM.createRoot>(() => ({
      render: vi.fn<Root["render"]>(),
      unmount: vi.fn<Root["unmount"]>(),
    })),
  },
}));

describe("main", () => {
  it("mounts the app into the root element and checks for updates once", async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import("@/main");

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById("root"));
    expect(checkUpdate).toHaveBeenCalledOnce();
  });
});
