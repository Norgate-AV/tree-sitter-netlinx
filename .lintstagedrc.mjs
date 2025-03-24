export default {
    "*?(test|spec).{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,md,html,json,yml,yaml}": ["prettier --write"],
    // "grammar.js": ["tree-sitter generate", "tree-sitter test"],
};
