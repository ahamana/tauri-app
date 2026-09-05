import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: {},
  sortPackageJson: {
    sortScripts: true,
  },
  ignorePatterns: ["*.toml", "pnpm-lock.yaml"],
});
