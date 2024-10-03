/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

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
    CALL: 15,
    FIELD: 16,
};

module.exports = grammar({
    name: "netlinx",

    conflicts: (_) => [],

    extras: ($) => [/\s|\\\r?\n/, $.comment],

    inline: (_) => [],

    supertypes: ($) => [
        $.expression,
        // $.statement,
        $.type_specifier,
        // $._declarator,
        // $._field_declarator,
        // $._type_declarator,
    ],

    word: ($) => $.identifier,

    rules: {
        source_file: ($) => seq($.program_name, optional($.section)),

        program_name: ($) =>
            seq(choice(/program_name/i, /module_name/i), "=", $.string_literal),

        // sections: ($) => repeat($.section),

        section: ($) =>
            choice(
                $.define_device_section,
                // $.define_combine_section,
                $.define_constant_section,
                // $.define_type_section,
                // $.define_variable_section,
                // $.define_connect_level_section,
                // $.define_latching_section,
                // $.define_mutually_exclusive_section,
                // $.define_toggling_section,
                // $.define_call_section,
                // $.define_function_section,
                // $.define_start_section,
                // $.define_event_section,
                // $.define_program_section,
            ),

        define_device_section: ($) =>
            seq(/define_device/i, repeat($.device_definition)),

        device_definition: ($) => seq($.identifier, "=", $.device_dps),

        device_dps: ($) =>
            seq(
                $.number_literal,
                ":",
                $.number_literal,
                ":",
                $.number_literal,
                optional(";"),
            ),

        define_combine_section: ($) =>
            seq(/define_combine/i, repeat($.combine_definition)),

        // combine_definition: ($) => seq("(", commaSep1($.identifier), ")"),
        combine_definition: ($) =>
            seq("(", commaSep1(/[A-Za-z_][A-Za-z0-9_]*/), ")"),

        define_constant_section: ($) => repeat($.constant_definition),

        constant_definition: ($) =>
            seq(
                choice(
                    $.identifier,
                    seq($.type_specifier, $.identifier),
                    seq(/constant/i, $.type_specifier, $.identifier),
                ),
                // "=",
                $.expression,
                optional(";"),
            ),

        type_specifier: ($) =>
            choice($.struct_specifier, $.primitive_type, $._type_identifier),

        struct_specifier: ($) =>
            prec.right(
                seq(
                    /struct(ure)?/i,
                    choice(
                        seq(
                            field("name", $._type_identifier),
                            field("body", optional($.field_declaration_list)),
                        ),
                    ),
                ),
            ),

        field_declaration_list: ($) =>
            seq("{", repeat($.field_declaration), "}"),

        // _field_declaration_list_item: ($) => $.field_declaration,

        field_declaration: ($) =>
            seq($.type_specifier, $.identifier, optional(";")),

        primitive_type: (_) =>
            token(
                choice(
                    /char/i,
                    /widechar/i,
                    /integer/i,
                    /sinteger/i,
                    /long/i,
                    /slong/i,
                    /float/i,
                    /double/i,
                ),
            ),

        expression: ($) =>
            choice($._expression_not_binary, $.binary_expression),

        _expression_not_binary: ($) =>
            choice(
                // $.conditional_expression,
                $.assignment_expression,
                // $.unary_expression,
                // $.update_expression,
                // $.call_expression,
                // $.field_expression,
                // $.compound_literal_expression,
                // $.identifier,
                // $.number_literal,
                // $._string,
                // $.true,
                // $.false,
                // $.char_literal,
                // $.parenthesized_expression,
            ),

        assignment_expression: ($) =>
            prec.right(
                PRECEDENCE.ASSIGNMENT,
                seq(
                    field("left", $._assignment_left_expression),
                    field("operator", "="),
                    field("right", $.expression),
                ),
            ),

        _assignment_left_expression: ($) =>
            choice(
                $.identifier,
                // $.call_expression,
                // $.field_expression,
                // $.parenthesized_expression,
            ),

        binary_expression: ($) => {
            const table = [
                ["+", PRECEDENCE.ADD],
                ["-", PRECEDENCE.ADD],
                ["*", PRECEDENCE.MULTIPLY],
                ["/", PRECEDENCE.MULTIPLY],
                ["%", PRECEDENCE.MULTIPLY],
                ["||", PRECEDENCE.LOGICAL_OR],
                ["&&", PRECEDENCE.LOGICAL_AND],
                ["|", PRECEDENCE.INCLUSIVE_OR],
                ["^", PRECEDENCE.EXCLUSIVE_OR],
                ["&", PRECEDENCE.BITWISE_AND],
                ["==", PRECEDENCE.EQUAL],
                ["!=", PRECEDENCE.EQUAL],
                [">", PRECEDENCE.RELATIONAL],
                [">=", PRECEDENCE.RELATIONAL],
                ["<=", PRECEDENCE.RELATIONAL],
                ["<", PRECEDENCE.RELATIONAL],
                ["<<", PRECEDENCE.SHIFT],
                [">>", PRECEDENCE.SHIFT],
            ];

            return choice(
                ...table.map(([operator, precedence]) => {
                    return prec.left(
                        precedence,
                        seq(
                            field("left", $.expression),
                            // @ts-ignore
                            field("operator", operator),
                            field("right", $.expression),
                        ),
                    );
                }),
            );
        },

        literal: ($) => choice($.number_literal, $.string_literal),

        string_literal: (_) => seq("'", /[^']*/, "'"),

        number_literal: (_) => {
            const hex = /\$[0-9a-fA-F]/;
            const decimal = /[0-9]/;
            // const hexDigits = seq(
            //     repeat1(hex),
            //     repeat(seq(separator, repeat1(hex))),
            // );
            const decimalDigits = repeat1(decimal);
            return token(
                seq(
                    optional(/[-\+]/),
                    choice(
                        seq(
                            choice(
                                decimalDigits,
                                seq(/0[bB]/, decimalDigits),
                                seq(/0[xX]/, hex),
                            ),
                            optional(seq(".", optional(hex))),
                        ),
                        seq(".", decimalDigits),
                    ),
                ),
            );
        },

        identifier: (_) => /^[_a-zA-Z]\w*/,

        _type_identifier: ($) => alias($.identifier, $.type_identifier),
        _field_identifier: ($) => alias($.identifier, $.field_identifier),

        comment: (_) =>
            token(
                choice(
                    seq("//", /(\\+(.|\r?\n)|[^\\\n])*/),
                    seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
                    seq("(*", /[^*]*\*+([^/*][^*]*\*+)*/, ")"),
                ),
            ),
    },
});

/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 *
 * @param {Rule | RegExp} rule
 *
 * @returns {ChoiceRule}
 */
function commaSep(rule) {
    return optional(commaSep1(rule));
}

/**
 * Creates a rule to match one or more of the rules separated by a comma
 *
 * @param {Rule | RegExp} rule
 *
 * @returns {SeqRule}
 */
function commaSep1(rule) {
    return seq(rule, repeat(seq(",", rule)));
}
