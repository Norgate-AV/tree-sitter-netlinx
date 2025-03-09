/**
 * @file NetLinx compiler directives for tree-sitter
 * @license MIT
 */

/**
 * NetLinX compiler directives
 */
module.exports = {
    // Compiler control directives
    INCLUDE: "#INCLUDE",
    DEFINE: "#DEFINE",
    IF: "#IF",
    IFDEF: "#IFDEF",
    IFNDEF: "#IFNDEF",
    ELSE: "#ELSE",
    ENDIF: "#ENDIF",
    UNDEF: "#UNDEF",

    // Pragma directives
    PRAGMA: "#PRAGMA",

    // Common pragma options
    PRAGMA_OPTIONS: [
        "ENABLE_DYNAMIC_COMPILATION",
        "DISABLE_STANDARD_DRAG_DROP",
        "ENABLE_STANDARD_DRAG_DROP",
    ],
};
