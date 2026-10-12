import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import oxlintTailwindcss from "oxlint-tailwindcss/config";
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
    plugins: ["import", "jsx-a11y", "oxc", "react", "typescript", "unicorn", "vitest"],
    extends: [oxlintTailwindcss()],
    settings: {
      tailwindcss: {
        entryPoint: "src/App.css",
      },
    },
    rules: {
      "import/consistent-type-specifier-style": "warn",
      // Beyond the recommended set, because fmt cannot wrap class strings
      "tailwindcss/enforce-consistent-line-wrapping": [
        "warn",
        {
          wrapLines: "all",
          wrapStrings: "jsx",
        },
      ],
      // Left to fmt.sortTailwindcss
      "tailwindcss/enforce-sort-order": "off",
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
      functions: ["cn"],
      // Keeps the line breaks from tailwindcss/enforce-consistent-line-wrapping;
      // the other whitespace is left to tailwindcss/no-unnecessary-whitespace
      preserveWhitespace: true,
      stylesheet: "src/App.css",
    },
    ignorePatterns: ["*.toml", "pnpm-lock.yaml"],
  },

  // Vitest configuration
  test: {
    coverage: {
      exclude: ["**/*.d.ts"],
      include: ["src/**/*.{ts,tsx}"],
    },
    environment: "jsdom",
    mockReset: true,
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
