import micromatch from "micromatch";

export default {
    "*?(test|spec).{js,jsx,ts,tsx}": (files) => {
        const match = micromatch(files, "!(grammar.js)");

        if (match.length === 0) {
            return [];
        }

        return [
            `eslint --fix ${match.join(" ")}`,
            `prettier --write ${match.join(" ")}`,
        ];
    },
    // "*?(test|spec).{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,md,html,json,yml,yaml}": (files) => {
        const match = micromatch(files, "!(src/*.json)");

        console.log(match);

        if (match.length === 0) {
            return [];
        }

        return [`prettier --write ${match.join(" ")}`];
    },
    "grammar.js": (file) => {
        return [
            `eslint --fix ${file}`,
            `prettier --write ${file}`,
            // "tree-sitter-cli generate",
            // "tree-sitter-cli test",
        ];
    },
};
