/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("./keywords");
// const netlinx = require("./netlinx");

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

    conflicts: ($) => [
        [$.constant_definition, $.type_specifier],
        [$.return_statement],
    ],

    extras: ($) => [/\s|\\\r?\n/, $.comment],

    inline: ($) => [
        $._type_identifier,
        $._field_identifier,
        $._statement_identifier,
        $._non_case_statement,
        $._assignment_left_expression,
        $._expression_not_binary,
    ],

    supertypes: ($) => [
        $.expression,
        $.statement,
        $.type_specifier,
        $._declarator,
        $._field_declarator,
        $._type_declarator,
        $._abstract_declarator,
    ],

    word: ($) => $.identifier,

    rules: {
        source_file: ($) => seq($.program_name, repeat($.section)),

        program_name: ($) =>
            seq(
                choice(keywords.program_name, keywords.module_name),
                "=",
                $.string_literal,
            ),

        _block_item: ($) =>
            choice(
                // $.function_definition,
                // alias($._old_style_function_definition, $.function_definition),
                $.declaration,
                $.statement,
            ),

        section: ($) =>
            choice(
                $.define_device_section,
                $.define_combine_section,
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
            seq(keywords.define_device, repeat($.device_definition)),

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
            seq(keywords.define_combine, repeat($.combine_definition)),

        combine_definition: ($) => seq("(", commaSep1($.identifier), ")"),

        define_constant_section: ($) =>
            seq(keywords.define_constant, repeat($.constant_definition)),

        constant_definition: ($) =>
            // seq(
            //     choice(
            //         seq($.type_qualifier, $.type_specifier, $.identifier),
            //         seq($.type_specifier, $.identifier),
            //         $.identifier,
            //     ),
            //     optional($.array_declarator),
            //     "=",
            //     $.expression,
            //     optional(";"),
            // ),
            choice(
                // seq(
                //     $.identifier,
                //     optional($.array_declarator),
                //     "=",
                //     $.expression,
                //     optional(";"),
                // ),
                // seq(
                //     $.type_specifier,
                //     $.identifier,
                //     optional($.array_declarator),
                //     "=",
                //     $.expression,
                //     optional(";"),
                // ),
                // seq(
                //     $.type_qualifier,
                //     $.type_specifier,
                //     $.identifier,
                //     optional($.array_declarator),
                //     "=",
                //     $.expression,
                //     optional(";"),
                // ),
                seq(
                    optional($.type_qualifier),
                    optional($.type_specifier),
                    $.identifier,
                    optional($.array_declarator),
                    "=",
                    $.expression,
                    optional(";"),
                ),
            ),

        define_function_section: ($) =>
            seq(keywords.define_function, $.function_definition),

        define_start_section: ($) =>
            seq(keywords.define_start, repeat($.statement)),

        init_declarator: ($) =>
            seq(
                field("declarator", $._declarator),
                "=",
                field("value", choice($.initializer_list, $.expression)),
            ),

        compound_statement: ($) => seq("{", repeat($._block_item), "}"),
        // compound_statement: ($) => seq("{", "}"),

        storage_class_specifier: (_) =>
            choice(keywords.local_var, keywords.stack_var),

        type_qualifier: ($) =>
            choice(
                keywords.constant,
                keywords.volatile,
                keywords.non_volatile,
                keywords.persistent,
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
                    keywords.char,
                    keywords.widechar,
                    keywords.integer,
                    keywords.sinteger,
                    keywords.long,
                    keywords.slong,
                    keywords.float,
                    keywords.double,
                ),
            ),

        function_definition: ($) =>
            seq(
                field("declarator", $._declarator),
                field("body", $.compound_statement),
            ),

        declaration: ($) =>
            seq(
                $._declaration_specifiers,
                commaSep1(
                    field(
                        "declarator",
                        choice(
                            seq($._declaration_declarator),
                            $.init_declarator,
                        ),
                    ),
                ),
                optional(";"),
            ),

        _declaration_modifiers: ($) =>
            choice($.storage_class_specifier, $.type_qualifier),

        _declaration_specifiers: ($) =>
            prec.right(
                seq(
                    repeat($._declaration_modifiers),
                    field("type", $.type_specifier),
                    repeat($._declaration_modifiers),
                ),
            ),

        _declarator: ($) =>
            choice(
                $.function_declarator,
                $.array_declarator,
                $.parenthesized_declarator,
                $.identifier,
            ),

        _declaration_declarator: ($) =>
            choice(
                alias(
                    $._function_declaration_declarator,
                    $.function_declarator,
                ),
                $.array_declarator,
                $.parenthesized_declarator,
                $.identifier,
            ),

        _field_declarator: ($) =>
            choice(
                alias($.function_field_declarator, $.function_declarator),
                alias($.array_field_declarator, $.array_declarator),
                alias(
                    $.parenthesized_field_declarator,
                    $.parenthesized_declarator,
                ),
                $._field_identifier,
            ),

        _type_declarator: ($) =>
            choice(
                alias($.function_type_declarator, $.function_declarator),
                alias($.array_type_declarator, $.array_declarator),
                alias(
                    $.parenthesized_type_declarator,
                    $.parenthesized_declarator,
                ),
                $._type_identifier,
                // alias(
                //     choice("signed", "unsigned", "long", "short"),
                //     $.primitive_type,
                // ),
                $.primitive_type,
            ),

        _abstract_declarator: ($) =>
            choice(
                // $.abstract_function_declarator,
                $.abstract_array_declarator,
                $.abstract_parenthesized_declarator,
            ),

        function_declarator: ($) =>
            prec.right(
                1,
                seq(
                    field("declarator", $._declarator),
                    field("parameters", $.parameter_list),
                    // repeat(choice($.identifier, $.call_expression)),
                ),
            ),

        _function_declaration_declarator: ($) =>
            prec.right(
                1,
                seq(
                    field("declarator", $._declarator),
                    field("parameters", $.parameter_list),
                ),
            ),

        parenthesized_declarator: ($) =>
            prec.dynamic(
                PRECEDENCE.PAREN_DECLARATOR,
                seq("(", $._declarator, ")"),
            ),

        parenthesized_field_declarator: ($) =>
            prec.dynamic(
                PRECEDENCE.PAREN_DECLARATOR,
                seq("(", optional($._field_declarator), ")"),
            ),

        parenthesized_type_declarator: ($) =>
            prec.dynamic(
                PRECEDENCE.PAREN_DECLARATOR,
                seq("(", optional($._type_declarator), ")"),
            ),

        abstract_parenthesized_declarator: ($) =>
            prec(1, seq("(", $._abstract_declarator, ")")),

        function_field_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._field_declarator),
                    field("parameters", $.parameter_list),
                ),
            ),

        function_type_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._type_declarator),
                    field("parameters", $.parameter_list),
                ),
            ),

        array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._declarator),
                    "[",
                    repeat(choice($.type_qualifier, "static")),
                    field("size", optional(choice($.expression, "*"))),
                    "]",
                ),
            ),

        array_field_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._field_declarator),
                    "[",
                    repeat(choice($.type_qualifier)),
                    field("size", optional(choice($.expression, "*"))),
                    "]",
                ),
            ),

        array_type_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._type_declarator),
                    "[",
                    repeat(choice($.type_qualifier)),
                    field("size", optional(choice($.expression, "*"))),
                    "]",
                ),
            ),

        abstract_array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", optional($._abstract_declarator)),
                    "[",
                    repeat(choice($.type_qualifier, "static")),
                    field("size", optional(choice($.expression, "*"))),
                    "]",
                ),
            ),

        parameter_list: ($) =>
            seq(
                "(",
                choice(
                    commaSep(choice($.parameter_declaration)),
                    $.compound_statement,
                ),
                ")",
            ),

        parameter_declaration: ($) =>
            seq(
                $._declaration_specifiers,
                optional(
                    field(
                        "declarator",
                        choice($._declarator, $._abstract_declarator),
                    ),
                ),
            ),

        /**
         * Statements
         */
        statement: ($) => choice($.case_statement, $._non_case_statement),
        // statement: ($) => choice($._non_case_statement),

        _non_case_statement: ($) =>
            choice(
                $.compound_statement,
                // $.expression_statement,
                $.if_statement,
                $.switch_statement,
                $.while_statement,
                $.for_statement,
                $.return_statement,
                $.break_statement,
                $.continue_statement,
            ),

        expression_statement: ($) =>
            seq(
                optional(choice($.expression, $.comma_expression)),
                optional(";"),
            ),

        if_statement: ($) =>
            prec.right(
                seq(
                    "if",
                    field("condition", $.parenthesized_expression),
                    field("consequence", $.statement),
                    optional(field("alternative", $.else_clause)),
                ),
            ),

        else_clause: ($) => seq("else", $.statement),

        switch_statement: ($) =>
            seq(
                "switch",
                field("condition", $.parenthesized_expression),
                field("body", $.compound_statement),
            ),

        case_statement: ($) =>
            prec.right(
                seq(
                    choice(
                        seq("case", field("value", $.expression)),
                        "default",
                    ),
                    ":",
                    repeat(choice($._non_case_statement, $.declaration)),
                ),
            ),

        while_statement: ($) =>
            seq(
                "while",
                field("condition", $.parenthesized_expression),
                field("body", $.statement),
            ),

        for_statement: ($) =>
            seq(
                "for",
                "(",
                $._for_statement_body,
                ")",
                field("body", $.statement),
            ),

        _for_statement_body: ($) =>
            seq(
                choice(
                    // field("initializer", $.declaration),
                    seq(
                        field(
                            "initializer",
                            optional(choice($.expression, $.comma_expression)),
                        ),
                        ";",
                    ),
                ),
                field(
                    "condition",
                    optional(choice($.expression, $.comma_expression)),
                ),
                ";",
                field(
                    "update",
                    optional(choice($.expression, $.comma_expression)),
                ),
            ),

        return_statement: ($) =>
            seq(
                "return",
                optional(choice($.expression, $.comma_expression)),
                optional(";"),
            ),
        // choice(
        //     seq("return", optional($.expression), optional(";")),
        //     seq("return", optional(";")),
        // ),

        break_statement: (_) => seq("break", optional(";")),

        continue_statement: (_) => seq("continue", optional(";")),

        /**
         * Expressions
         */
        expression: ($) =>
            choice($._expression_not_binary, $.binary_expression),

        _expression_not_binary: ($) =>
            choice(
                $.assignment_expression,
                $.unary_expression,
                $.update_expression,
                $.call_expression,
                $.field_expression,
                // $.compound_literal_expression,
                $.identifier,
                $.number_literal,
                $.string_literal,
                // $.true,
                // $.false,
                // $.char_literal,
                $.parenthesized_expression,
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
                $.call_expression,
                $.field_expression,
                $.parenthesized_expression,
            ),

        unary_expression: ($) =>
            prec.left(
                PRECEDENCE.UNARY,
                seq(
                    field("operator", choice("!", "~", "-", "+")),
                    field("argument", $.expression),
                ),
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

        update_expression: ($) => {
            const argument = field("argument", $.expression);
            const operator = field("operator", choice("--", "++"));
            return prec.right(
                PRECEDENCE.UNARY,
                choice(seq(operator, argument), seq(argument, operator)),
            );
        },

        call_expression: ($) =>
            prec(
                PRECEDENCE.CALL,
                seq(
                    field("function", $.expression),
                    field("arguments", $.argument_list),
                ),
            ),

        comma_expression: ($) =>
            seq(
                field("left", $.expression),
                ",",
                field("right", choice($.expression, $.comma_expression)),
            ),

        argument_list: ($) =>
            seq("(", commaSep(choice($.expression, $.compound_statement)), ")"),

        field_expression: ($) =>
            seq(
                prec(
                    PRECEDENCE.FIELD,
                    seq(
                        field("argument", $.expression),
                        field("operator", "."),
                    ),
                ),
                field("field", $._field_identifier),
            ),

        parenthesized_expression: ($) =>
            seq(
                "(",
                // choice($.expression, $.comma_expression, $.compound_statement),
                choice($.expression, $.comma_expression),
                ")",
            ),

        initializer_list: ($) =>
            seq(
                "{",
                commaSep(
                    choice(
                        $.initializer_pair,
                        $.expression,
                        $.initializer_list,
                    ),
                ),
                optional(","),
                "}",
            ),

        initializer_pair: ($) =>
            choice(
                seq(
                    field(
                        "designator",
                        repeat1(
                            choice(
                                // $.subscript_designator,
                                $.field_designator,
                                // $.subscript_range_designator,
                            ),
                        ),
                    ),
                    "=",
                    field("value", choice($.expression, $.initializer_list)),
                ),
                seq(
                    field("designator", $._field_identifier),
                    ":",
                    field("value", choice($.expression, $.initializer_list)),
                ),
            ),

        field_designator: ($) => seq(".", $._field_identifier),

        literal: ($) => choice($.number_literal, $.string_literal),

        string_literal: (_) => seq("'", /[^']*/, "'"),

        number_literal: (_) => /[-+]?\d+/,

        // number_literal: (_) => {
        //     const hex = /\$[0-9a-fA-F]/;
        //     const decimal = /[0-9]/;
        //     // const hexDigits = seq(
        //     //     repeat1(hex),
        //     //     repeat(seq(separator, repeat1(hex))),
        //     // );
        //     const decimalDigits = repeat1(decimal);
        //     return token(
        //         seq(
        //             optional(/[-\+]/),
        //             choice(
        //                 seq(
        //                     choice(
        //                         decimalDigits,
        //                         seq(/0[bB]/, decimalDigits),
        //                         seq(/0[xX]/, hex),
        //                     ),
        //                     optional(seq(".", optional(hex))),
        //                 ),
        //                 seq(".", decimalDigits),
        //             ),
        //         ),
        //     );
        // },

        identifier: (_) => /[_a-zA-Z]\w*/,

        _type_identifier: ($) => alias($.identifier, $.type_identifier),
        _field_identifier: ($) => alias($.identifier, $.field_identifier),
        _statement_identifier: ($) =>
            alias($.identifier, $.statement_identifier),

        comment: (_) =>
            token(
                choice(
                    seq("//", /(\\+(.|\r?\n)|[^\\\n])*/),
                    seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
                    seq("(*", /[^*]*\*+([^\(*][^*]*\*+)*/, ")"),
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
