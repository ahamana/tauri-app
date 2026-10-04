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
    plugins: ["import", "jsx-a11y", "oxc", "react", "typescript", "unicorn", "vitest"],
    jsPlugins: ["oxlint-tailwindcss"],
    settings: {
      tailwindcss: {
        entryPoint: "src/App.css",
      },
    },
    rules: {
      "import/consistent-type-specifier-style": "warn",
      // tailwindcss/*: the recommended set, except for enforce-sort-order and
      // no-unnecessary-whitespace, which are left to fmt.sortTailwindcss
      "tailwindcss/consistent-variant-order": "warn",
      "tailwindcss/enforce-canonical": "warn",
      "tailwindcss/enforce-consistent-important-position": "warn",
      "tailwindcss/enforce-consistent-variable-syntax": "warn",
      "tailwindcss/enforce-negative-arbitrary-values": "warn",
      "tailwindcss/enforce-shorthand": "warn",
      "tailwindcss/no-conflicting-classes": "error",
      "tailwindcss/no-contradicting-variants": "warn",
      "tailwindcss/no-dark-without-light": "warn",
      "tailwindcss/no-deprecated-classes": "error",
      "tailwindcss/no-duplicate-classes": "warn",
      "tailwindcss/no-dynamic-classes": "error",
      "tailwindcss/no-hardcoded-colors": "warn",
      "tailwindcss/no-unknown-classes": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
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
