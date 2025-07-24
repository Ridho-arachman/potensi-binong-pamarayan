import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Warisan dari .eslintrc jika ada
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Konfigurasi umum
  ...compat.config({
    extends: ["next"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
  }),

  // ✅ Matikan semua rule untuk Prisma generated files
  {
    files: ["src/generated/prisma/**/*.{js,ts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // ✅ Abaikan sepenuhnya dari linting
  {
    ignores: ["src/generated/prisma/**"],
  },
];

export default eslintConfig;
