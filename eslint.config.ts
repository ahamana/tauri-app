import { join } from "path";

import { includeIgnoreFile } from "@eslint/config-helpers";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const gitignorePath = join(import.meta.dirname, ".gitignore");

export default defineConfig(
  includeIgnoreFile(gitignorePath, {
    gitignoreResolution: true,
  }),
  globalIgnores(["src-tauri/"]),
  {
    files: [tseslint.globs.js],
    extends: [eslint.configs.recommended],
  },
  {
    files: [tseslint.globs.ts],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "import-x/consistent-type-specifier-style": "warn",
    },
  },
  {
    files: [tseslint.globs.jsts],
    extends: [
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat["jsx-runtime"],
      eslintPluginReactHooks.configs.flat["recommended-latest"],
    ],
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    settings: {
      "import-x/resolver-next": createTypeScriptImportResolver(),
      react: {
        version: "detect",
      },
    },
    rules: {
      "import-x/order": [
        "warn",
        {
          "newlines-between": "always",
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
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
