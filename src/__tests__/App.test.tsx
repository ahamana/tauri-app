import { invoke } from "@tauri-apps/api/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import App from "@/App";
import { checkUpdate } from "@/lib/updater";

vi.mock("@tauri-apps/api/core");
vi.mock("@/lib/updater");

describe("App", () => {
  it("checks for updates on mount", () => {
    render(<App />);

    expect(checkUpdate).toHaveBeenCalledOnce();
  });

  it("passes the entered name to the greet command and renders the result", async () => {
    const user = userEvent.setup();
    vi.mocked(invoke).mockResolvedValue("Hello, Tauri!");

    render(<App />);

    await user.type(screen.getByPlaceholderText("Enter a name..."), "Tauri");
    await user.click(screen.getByRole("button", { name: "Greet" }));

    expect(invoke).toHaveBeenCalledWith("greet", { name: "Tauri" });
    expect(await screen.findByText("Hello, Tauri!")).toBeInTheDocument();
  });
});
