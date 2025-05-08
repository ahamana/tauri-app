import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, ".gitignore");

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  globalIgnores(["src-tauri/**"]),
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx}"],
    extends: [eslint.configs.recommended],
  },
  {
    files: ["**/*.{ts,mts,cts,tsx,mtsx}"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["**/*.{js,mjs,jsx,mjsx,ts,tsx,mtsx}"],
    extends: [eslintPluginReact.configs.flat.recommended],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx}"],
    extends: [eslintPluginImport.flatConfigs.recommended],
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "unused-imports/no-unused-imports": "error",
    },
  },
  eslintConfigPrettier,
]);
