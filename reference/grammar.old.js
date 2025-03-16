/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("../keywords");
const netlinx = require("../netlinx");
const functions = require("../functions");

// Add a new precedence level for array function declarations
const PRECEDENCE = {
    PAREN_DECLARATOR: -10,
    ASSIGNMENT: -2,
    DEFAULT: 0,
    LOGICAL_OR: 1,
    LOGICAL_AND: 2,
    INCLUSIVE_OR: 3,
    EXCLUSIVE_OR: 4,
    BITWISE_AND: 5,
    EQUAL: 6,
    RELATIONAL: 7,
    SHIFT: 9,
    ADD: 10,
    MULTIPLY: 11,
    UNARY: 14,
    FUNCTION_REF: 15, // Add this line - lower precedence than array access
    CALL: 17,
    ARRAY_ACCESS: 18, // Increase this from 16 to be higher than function_ref
    ARRAY_FUNCTION: 19, // Add this line - higher precedence than array access
    FIELD: 16,
    DIRECTIVE: 20,
    EVENT_PARAM: 90,
    EVENT_TYPE: 100,
    SECTION_DEFINITION: 110,
};

module.exports = grammar({
    name: "netlinx",

    // Add this option for case insensitivity globally
    word: ($) => $.identifier,

    // Update conflicts to include the conflict between array_declarator and abstract_array_declarator
    conflicts: ($) => [],

    extras: ($) => [/\s|\\\r?\n/, $.comment],

    inline: ($) => [],

    supertypes: ($) => [],

    rules: {
        // NetLinx specific functions
        netlinx_function_call: ($) =>
            prec(
                PRECEDENCE.CALL,
                choice(
                    $.send_command,
                    $.send_string,
                    $.send_level,
                    $.create_buffer,
                    $.clear_buffer,
                    $.set_length_array,
                    $.timeline_function,
                ),
            ),

        send_command: ($) =>
            seq(
                keywords.send_command,
                field("device", $.expression),
                ",",
                field("command", choice($.string_literal, $.identifier)),
            ),

        send_string: ($) =>
            seq(
                keywords.send_string,
                field("device", $.expression),
                ",",
                field("string", choice($.string_literal, $.identifier)),
            ),

        send_level: ($) =>
            seq(
                keywords.send_level,
                field("device", $.expression),
                ",",
                field("level", $.expression),
                ",",
                field("value", $.expression),
            ),

        create_buffer: ($) =>
            prec.right(
                seq(
                    keywords.create_buffer,
                    field("buffer", $.identifier),
                    optional(seq(",", field("size", $.expression))),
                ),
            ),

        clear_buffer: ($) =>
            seq(keywords.clear_buffer, field("buffer", $.identifier)),

        set_length_array: functions.set_length_array,
        timeline_function: functions.timeline_function,
        timeline_create: functions.timeline_create,
        timeline_kill: functions.timeline_kill,

        // DATA structure field access
        data_field_access: ($) =>
            prec(
                PRECEDENCE.FIELD + 1,
                seq(
                    netlinx.data,
                    ".",
                    field(
                        "field",
                        choice(
                            /TEXT/i,
                            /ONLINE/i,
                            /OFFLINE/i,
                            /COMMAND/i,
                            /VALUE/i,
                        ),
                    ),
                ),
            ),

        // Function reference without calling it
        function_reference: ($) =>
            prec.right(PRECEDENCE.FUNCTION_REF, $.identifier),

        // Add the missing netlinx_custom_function rule
        netlinx_custom_function: ($) =>
            choice(
                // Regular custom function (no colon)
                prec.dynamic(
                    PRECEDENCE.CALL + 12,
                    seq(
                        field("function", choice($.function_reference)),
                        field("body", $.compound_statement),
                    ),
                ),
                // Custom function with colon syntax (higher precedence)
                prec.dynamic(
                    PRECEDENCE.CALL + 15,
                    seq(
                        field("function", $.function_reference),
                        field("separator", token.immediate(choice(":", ";"))), // Force immediate attachment
                        field(
                            "body",
                            alias($.compound_statement, $.function_body),
                        ),
                    ),
                ),
            ),

        // Add device_field_access for proper property access
        device_field_access: ($) =>
            prec(
                PRECEDENCE.FIELD + 1,
                seq(
                    field("device", $.expression),
                    ".",
                    field(
                        "field",
                        choice(
                            /NUMBER/i,
                            /PORT/i,
                            /SYSTEM/i,
                            // Add other device properties as needed
                        ),
                    ),
                ),
            ),
    },
});

/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 *
 * @param {Rule} rule
 *
 * @returns {ChoiceRule}
 */
function commaSep(rule) {
    return optional(commaSep1(rule));
}

/**
 * Creates a rule to match one or more of the rules separated by a comma
 *
 * @param {Rule} rule
 *
 * @returns {SeqRule}
 */
function commaSep1(rule) {
    return seq(rule, repeat(seq(",", rule)));
}
