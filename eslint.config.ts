import { resolve } from "path";

import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const gitignorePath = resolve(import.meta.dirname, ".gitignore");

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  globalIgnores(["src-tauri/"]),
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx}"],
    extends: [eslint.configs.recommended],
  },
  {
    files: ["**/*.{ts,mts,cts,tsx,mtsx}"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "import-x/consistent-type-specifier-style": "warn",
    },
  },
  {
    files: ["**/*.{js,mjs,jsx,mjsx,ts,tsx,mtsx}"],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat["jsx-runtime"],
      eslintPluginReactHooks.configs["recommended-latest"],
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx}"],
    extends: [eslintPluginImportX.flatConfigs.recommended],
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    settings: {
      "import-x/resolver-next": createTypeScriptImportResolver({
        alwaysTryTypes: true,
      }),
    },
    rules: {
      "import-x/order": [
        "warn",
        {
          "newlines-between": "always",
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  eslintConfigPrettier,
);
