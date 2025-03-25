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
    "*.{css,scss,md,html,json,yml,yaml}": ["prettier --write"],
    "grammar.js": (file) => {
        return [
            `eslint --fix ${file}`,
            `prettier --write ${file}`,
            // "pnpm test",
        ];
    },
};
