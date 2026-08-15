import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["import", "oxc", "react", "typescript", "unicorn"],
  rules: {
    "import/consistent-type-specifier-style": "warn",
    "react/react-compiler": "error",
    "typescript/consistent-type-imports": "warn",
  },
});
