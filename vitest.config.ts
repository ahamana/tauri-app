import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

// https://vitest.dev/config/
export default defineConfig((configEnv) =>
  mergeConfig(viteConfig(configEnv), {
    test: {
      environment: "jsdom",
      setupFiles: ["./src/__tests__/vitest.setup.ts"],
    },
  }),
);
