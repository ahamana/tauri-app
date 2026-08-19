import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["import", "oxc", "react", "typescript", "unicorn"],
  rules: {
    "import/consistent-type-specifier-style": "warn",
    "typescript/consistent-type-imports": "warn",
  },
});
