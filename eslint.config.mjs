import { defineConfig } from "eslint/config";
import treesitter from "eslint-config-treesitter";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
    ...treesitter,
    eslintConfigPrettier,
    { ignores: ["src", "bindings", "node_modules"] },
]);
