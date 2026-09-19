import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const host = process.env.TAURI_DEV_HOST;

// https://viteplus.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },

  // Oxlint configuration
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ["import", "jsx-a11y", "oxc", "react", "typescript", "unicorn"],
    rules: {
      "import/consistent-type-specifier-style": "warn",
      "typescript/consistent-type-imports": "warn",
    },
  },

  // Oxfmt configuration
  fmt: {
    sortImports: {},
    sortPackageJson: {
      sortScripts: true,
    },
    sortTailwindcss: {
      stylesheet: "src/App.css",
    },
    ignorePatterns: ["*.toml", "pnpm-lock.yaml"],
  },

  // Vitest configuration
  test: {
    environment: "jsdom",
    mockReset: true,
    // Vitest 4 has no default file output, so the CI report path is set explicitly
    outputFile: {
      junit: ".vitest/junit/output.xml",
    },
    setupFiles: ["./src/__tests__/vitest.setup.ts"],
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    host: host || false,
    port: 1420,
    strictPort: true,
    ws: host
      ? {
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
});
