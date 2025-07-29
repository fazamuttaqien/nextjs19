import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import globals from "globals"
import tseslint from "typescript-eslint"

import prettierPlugin from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"
import jsxA11y from "eslint-plugin-jsx-a11y"
import sonarjs from "eslint-plugin-sonarjs"
import promise from "eslint-plugin-promise"
import node from "eslint-plugin-node"
import unicorn from "eslint-plugin-unicorn"
import perfectionist from "eslint-plugin-perfectionist"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

const eslintConfig = tseslint.config(
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      "unused-imports": unusedImports,
      "jsx-a11y": jsxA11y,
      sonarjs,
      promise,
      node,
      unicorn,
      perfectionist,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "prettier/prettier": "error",

      // 🧠 Organize imports by group
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "off",

      // 🧹 Clean up unused imports and vars
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      // Disable the default rules because we are using 'unused-imports'
      "@typescript-eslint/no-unused-vars": "off",

      // ♿ JSX accessibility (Next.js already has this, this is to override/add)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // 🧠 SonarJS - cognitive complexity & duplication
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-identical-functions": "warn",

      // 🔁 Promise handling best practices
      "promise/always-return": "warn",
      "promise/no-return-wrap": "warn",

      // 📏 General JS/TS rules
      "@typescript-eslint/no-redeclare": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      // This rule may be too strict for Next.js which makes heavy use of env vars.
      // "node/no-process-env": ["error"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "no-alert": "error",
      "no-magic-numbers": "warn",
      "prefer-const": "error",

      // ↕️ Sort imports for readability
      // Warning: this may conflict with "import/order". Choose one or configure it to avoid conflict.
      // If you're more of a perfectionist, remove "import/order".
      // "perfectionist/sort-imports": [
      //   "error",
      //   { type: "natural", order: "asc", "ignore-case": true, groups: [] },
      // ],

      // 📁 Enforce consistent file naming (customized for Next.js App Router)
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            snakeCase: true,
            pascalCase: true,
          },
          // Ignore Next.js convention files
          ignore: [
            "README.md",
            "page.tsx",
            "layout.tsx",
            "template.tsx",
            "loading.tsx",
            "error.tsx",
            "not-found.tsx",
            "global-error.tsx",
            "route.ts",
          ],
        },
      ],
    },
  },

  // Configuration to disable rules in specific files (optional)
  {
    files: ["eslint.config.mjs", "next.config.mjs"],
    rules: {
      "unicorn/filename-case": "off",
      "no-magic-numbers": "off",
    },
  },

  // Add Prettier as the last config to override the format rules.
  prettierConfig
)

export default eslintConfig
