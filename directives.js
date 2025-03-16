/**
 * @file NetLinx preprocessor directives for tree-sitter
 * @license MIT
 */

/**
 * NetLinx preprocessor directives
 */
module.exports = {
    INCLUDE: /#?include/i,
    WARN: /#warn/i,
    DEFINE: /#define/i,
    IF_DEFINED: /#if_defined/i,
    IF_NOT_DEFINED: /#if_not_defined/i,
    ELSE: /#else/i,
    END_IF: /#end_if/i,
};
