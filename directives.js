/**
 * @file NetLinx compiler directives for tree-sitter
 * @license MIT
 */

/**
 * NetLinX compiler directives
 */
module.exports = {
    // Compiler control directives
    INCLUDE: /#INCLUDE/i,
    WARN: /#WARN/i,
    DEFINE: /#DEFINE/i,
    IF_DEFINED: /#IF_DEFINED/i,
    IF_NOT_DEFINED: /#IF_NOT_DEFINED/i,
    ELSE: /#ELSE/i,
    END_IF: /#END_IF/i,
};
