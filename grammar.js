/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("./keywords");
const netlinx = require("./netlinx");
const directives = require("./directives");
// const functions = require("./functions");

// Add a new precedence level for array function declarations
const PREC = {
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
    FUNCTION_REF: 15,
    CALL: 17,
    SUBSCRIPT: 18,
    ARRAY_FUNCTION: 19,
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

    conflicts: ($) => [
        // [$.type_specifier, $._declarator],
        // [$.type_specifier, $.expression],
        // [$.function_declarator, $._function_declaration_declarator],
        // [$._block_item, $.statement],
        // [$.array_declarator, $.device_channel_reference_expression],
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

    rules: {
        source_file: ($) =>
            seq(
                repeat(choice($.preproc_directive, $.comment)),
                optional(
                    seq(
                        choice($.program_name, $.module_name),
                        repeat(choice($.preproc_directive, $.comment)),
                    ),
                ),
                repeat($.section),
            ),

        program_name: ($) =>
            prec.right(
                PREC.DIRECTIVE + 10, // Even higher precedence than directives
                seq(
                    keywords.program_name, // Keep using the standard keyword
                    "=",
                    $.string_literal,
                ),
            ),

        module_name: ($) =>
            seq(
                keywords.module_name,
                "=",
                $.string_literal,
                optional(field("parameters", $.parameter_list)),
            ),

        _block_item: ($) => choice($.declaration, $.statement),

        // Pre-processor
        // Compiler directives
        preproc_directive: ($) =>
            choice(
                $.preproc_include,
                $.preproc_define,
                $.preproc_if_defined,
                $.preproc_if_not_defined,
                $.preproc_else,
                $.preproc_end_if,
                $.preproc_warn,
            ),

        preproc_include: ($) =>
            prec(
                PREC.DIRECTIVE,
                seq(directives.INCLUDE, token(seq("'", /[^']*/, "'"))),
            ),

        preproc_define: ($) =>
            prec(
                PREC.DIRECTIVE,
                seq(
                    directives.DEFINE,
                    $.identifier,
                    optional(choice($.number_literal, $.string_literal)),
                ),
            ),

        preproc_if_defined: ($) =>
            prec(PREC.DIRECTIVE, seq(directives.IF_DEFINED, $.identifier)),

        preproc_if_not_defined: ($) =>
            prec(PREC.DIRECTIVE, seq(directives.IF_NOT_DEFINED, $.identifier)),

        preproc_else: ($) => prec(PREC.DIRECTIVE, directives.ELSE),

        preproc_end_if: ($) => prec(PREC.DIRECTIVE, directives.END_IF),

        preproc_warn: ($) =>
            prec(
                PREC.DIRECTIVE,
                seq(directives.WARN, token(seq("'", /[^']*/, "'"))),
            ),

        // Main Grammar

        section: ($) =>
            choice(
                $.define_device_section,
                $.define_combine_section,
                $.define_connect_level_section,
                $.define_constant_section,
                $.define_type_section,
                $.define_variable_section,
                $.define_function_section,
                $.define_module_section,
                $.define_start_section,
                $.define_program_section,
            ),

        define_device_section: ($) =>
            prec(
                PREC.SECTION_DEFINITION,
                seq(keywords.define_device, repeat($.device_definition)),
            ),

        device_definition: ($) =>
            seq($.identifier, "=", $.device_literal, optional(";")),

        define_combine_section: ($) =>
            seq(keywords.define_combine, repeat($.combine_definition)),

        combine_definition: ($) =>
            seq("(", commaSep1($.expression), ")", optional(";")),

        define_connect_level_section: ($) =>
            seq(
                keywords.define_connect_level,
                repeat($.connect_level_definition),
            ),

        connect_level_definition: ($) =>
            seq("(", commaSep1($.expression), ")", optional(";")),

        define_constant_section: ($) =>
            seq(keywords.define_constant, repeat($.constant_definition)),

        constant_definition: ($) =>
            prec.right(
                5,
                seq(
                    optional($.type_qualifier),
                    optional($.type_specifier),
                    field("name", $.identifier),
                    optional(
                        field(
                            "dimensions",
                            repeat1(seq("[", optional($.expression), "]")),
                        ),
                    ),
                    "=",
                    field(
                        "value",
                        choice(
                            $.expression,
                            $.string_literal,
                            $.initializer_list,
                        ),
                    ),
                    optional(";"),
                ),
            ),

        define_type_section: ($) =>
            seq(keywords.define_type, optional(repeat1($.type_specifier))),

        define_variable_section: ($) =>
            seq(keywords.define_variable, repeat($.global_variable_definition)),

        global_variable_definition: ($) =>
            prec.right(
                5,
                seq(
                    optional($.type_qualifier),
                    optional($.type_specifier),
                    field("name", $.identifier),
                    optional(
                        field(
                            "dimensions",
                            repeat1(seq("[", optional($.expression), "]")),
                        ),
                    ),
                    optional("="),
                    optional(
                        field(
                            "value",
                            choice(
                                $.expression,
                                $.string_literal,
                                $.initializer_list,
                            ),
                        ),
                    ),
                    optional(";"),
                ),
            ),

        define_function_section: ($) =>
            seq(keywords.define_function, $.function_definition),

        define_module_section: ($) =>
            seq(keywords.define_module, repeat($.module_definition)),

        module_definition: ($) =>
            seq(
                field("module_name", $.string_literal),
                field("instance_name", $.identifier),
                field("parameters", $.argument_list),
                optional(";"),
            ),

        define_start_section: ($) =>
            prec(
                PREC.SECTION_DEFINITION,
                seq(
                    keywords.define_start,
                    choice(repeat($._block_item), $.compound_statement),
                ),
            ),

        define_program_section: ($) =>
            prec(
                PREC.SECTION_DEFINITION,
                seq(
                    keywords.define_program,
                    choice(repeat($._block_item), $.compound_statement),
                ),
            ),

        _abstract_declarator: ($) => choice($.abstract_array_declarator),

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
                    repeat(choice($.type_qualifier, "static")),
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
                    repeat(choice($.type_qualifier, "static")),
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

        init_declarator: ($) =>
            seq(
                field("declarator", $._declarator),
                "=",
                field("value", choice($.initializer_list, $.expression)),
            ),

        compound_statement: ($) => seq("{", repeat($._block_item), "}"),

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
            choice($.struct_specifier, $.primitive_type, $.identifier),

        struct_specifier: ($) =>
            seq(
                choice(keywords.struct, keywords.structure),
                choice(
                    seq(
                        field("name", $.identifier),
                        field("body", $.field_declaration_list),
                    ),
                ),
            ),

        field_declaration_list: ($) =>
            seq("{", repeat1($.field_declaration), "}"),

        field_declaration: ($) =>
            seq(
                field("type", $.type_specifier),
                field("name", $.identifier),
                optional(
                    field(
                        "dimensions",
                        repeat1(seq("[", optional($.expression), "]")),
                    ),
                ),
                optional(";"),
            ),

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
                    // Add NetLinx structured types
                    keywords.dev,
                    keywords.devlev,
                    keywords.devchan,
                    netlinx.tdata,
                    netlinx.tchannel,
                    netlinx.tlevel,
                    netlinx.tbutton,
                    netlinx.ttimeline,
                    netlinx.tcustom,
                ),
            ),

        function_definition: ($) =>
            choice(
                // No return type (void)
                seq(
                    field("name", $.identifier),
                    field("parameters", $.parameter_list),
                    field("body", $.compound_statement),
                ),

                // Char array return type
                seq(
                    field(
                        "return_type",
                        seq(
                            token(keywords.char),
                            token.immediate("["),
                            field("size", $.expression),
                            "]",
                        ),
                    ),
                    field("name", $.identifier),
                    field("parameters", $.parameter_list),
                    field("body", $.compound_statement),
                ),

                // Simple primitive return type
                seq(
                    field(
                        "return_type",
                        choice(
                            token(keywords.char),
                            token(keywords.widechar),
                            token(keywords.integer),
                            token(keywords.sinteger),
                            token(keywords.long),
                            token(keywords.slong),
                            token(keywords.float),
                            token(keywords.double),
                        ),
                    ),
                    field("name", $.identifier),
                    field("parameters", $.parameter_list),
                    field("body", $.compound_statement),
                ),
            ),

        declaration: ($) =>
            prec.right(
                2, // Increase precedence to resolve conflicts with statements
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
            prec(
                2, // Increase from 1 to 2 to be higher than type_specifier
                choice(
                    $.function_declarator,
                    $.array_declarator,
                    $.parenthesized_declarator,
                    $.identifier,
                ),
            ),

        _declaration_declarator: ($) =>
            prec(
                3, // Increase from 2 to 3 to be higher than _declarator
                choice(
                    alias(
                        $._function_declaration_declarator,
                        $.function_declarator,
                    ),
                    $.array_declarator,
                    $.parenthesized_declarator,
                    $.identifier,
                ),
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
                $.primitive_type,
            ),

        function_declarator: ($) =>
            prec.right(
                1,
                seq(
                    field("return_type", optional($.type_specifier)),
                    field("name", $.identifier),
                    field("parameters", $.parameter_list),
                ),
            ),

        _function_declaration_declarator: ($) =>
            prec.right(
                2, // Higher precedence than function_declarator
                seq(
                    field("declarator", $._declarator),
                    field("parameters", $.parameter_list),
                ),
            ),

        parenthesized_declarator: ($) =>
            prec.dynamic(PREC.PAREN_DECLARATOR, seq("(", $._declarator, ")")),

        parenthesized_field_declarator: ($) =>
            prec.dynamic(
                PREC.PAREN_DECLARATOR,
                seq("(", optional($._field_declarator), ")"),
            ),

        parenthesized_type_declarator: ($) =>
            prec.dynamic(
                PREC.PAREN_DECLARATOR,
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

        parameter_list: ($) =>
            prec.left(
                PREC.CALL + 1,
                seq(
                    "(",
                    choice(
                        commaSep(choice($.parameter_declaration)),
                        $.compound_statement,
                    ),
                    ")",
                ),
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

        _non_case_statement: ($) =>
            choice(
                $.compound_statement,
                $.if_statement,
                $.switch_statement,
                $.select_statement,
                $.while_statement,
                $.for_statement,
                $.return_statement,
                $.break_statement,
                $.continue_statement,
                $.expression_statement,
            ),

        expression_statement: ($) =>
            prec.right(
                10,
                choice(
                    // Standard expression statements
                    seq(
                        choice($.expression, $.comma_expression),
                        optional(";"),
                    ),
                    // Dedicated handling for NetLinx custom functions as statements
                    // prec.dynamic(15, $.netlinx_custom_function),
                    ";",
                ),
            ),

        if_statement: ($) =>
            prec.right(
                seq(
                    keywords.if,
                    field("condition", $.parenthesized_expression),
                    field("consequence", $.statement),
                    optional(field("alternative", $.else_clause)),
                ),
            ),

        else_clause: ($) => seq(keywords.else, $.statement),

        switch_statement: ($) =>
            seq(
                keywords.switch,
                field("condition", $.parenthesized_expression),
                field("body", $.compound_statement),
            ),

        case_statement: ($) =>
            prec.right(
                seq(
                    choice(
                        seq(keywords.case, field("value", $.expression)),
                        keywords.default,
                    ),
                    ":",
                    repeat(choice($._non_case_statement, $.declaration)),
                ),
            ),

        while_statement: ($) =>
            seq(
                keywords.while,
                field("condition", $.parenthesized_expression),
                field("body", $.statement),
            ),

        for_statement: ($) =>
            seq(
                keywords.for,
                "(",
                $._for_statement_body,
                ")",
                field("body", $.statement),
            ),

        _for_statement_body: ($) =>
            seq(
                choice(
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

        select_statement: ($) =>
            seq(keywords.select, "{", repeat1($.active_block), "}"),

        active_block: ($) =>
            seq(
                keywords.active,
                field("condition", $.parenthesized_expression),
                ":",
                field("body", $.statement),
            ),

        return_statement: ($) =>
            prec.right(
                seq(
                    keywords.return,
                    optional(choice($.expression, $.comma_expression)),
                    optional(";"),
                ),
            ),

        break_statement: (_) => prec.right(seq(keywords.break, optional(";"))),

        continue_statement: (_) =>
            prec.right(seq(keywords.continue, optional(";"))),

        /**
         * Expressions
         */
        expression: ($) =>
            prec(
                2, // Increase from 1 to 2
                choice($._expression_not_binary, $.binary_expression),
            ),

        _expression_not_binary: ($) =>
            choice(
                $.assignment_expression,
                $.unary_expression,
                $.update_expression,
                $.call_expression,
                // Add simple identifier as a function reference without calling it
                // $.function_reference,
                $.field_expression,
                $.subscript_expression,
                $.identifier,
                $.literal,
                $.string_expression,
                $.parenthesized_expression,
                // $.device_channel_assignment_expression,
                // $.device_channel_reference_expression,
            ),

        assignment_expression: ($) =>
            prec.right(
                PREC.ASSIGNMENT,
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
                $.subscript_expression,
                $.parenthesized_expression,
            ),

        unary_expression: ($) =>
            prec.right(
                PREC.UNARY,
                seq(
                    field("operator", choice("!", "~", "-", "+")),
                    field("argument", $.expression),
                ),
            ),

        binary_expression: ($) => {
            const table = [
                ["+", PREC.ADD],
                ["-", PREC.ADD],
                ["*", PREC.MULTIPLY],
                ["/", PREC.MULTIPLY],
                ["%", PREC.MULTIPLY],
                ["||", PREC.LOGICAL_OR],
                ["&&", PREC.LOGICAL_AND],
                ["|", PREC.INCLUSIVE_OR],
                ["^", PREC.EXCLUSIVE_OR],
                ["&", PREC.BITWISE_AND],
                ["==", PREC.EQUAL],
                ["!=", PREC.EQUAL],
                [">", PREC.RELATIONAL],
                [">=", PREC.RELATIONAL],
                ["<=", PREC.RELATIONAL],
                ["<", PREC.RELATIONAL],
                ["<<", PREC.SHIFT],
                [">>", PREC.SHIFT],
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
            return prec.right(PREC.UNARY, seq(argument, operator));
        },

        subscript_expression: ($) =>
            prec(
                PREC.SUBSCRIPT,
                seq(
                    field("argument", $.expression),
                    "[",
                    field("index", $.expression),
                    "]",
                ),
            ),

        call_expression: ($) =>
            prec(
                PREC.CALL,
                seq(
                    field("function", $.expression),
                    field("arguments", $.argument_list),
                ),
            ),

        comma_expression: ($) =>
            prec.right(
                // Change to right associativity
                PREC.DEFAULT, // Lower precedence than argument_list
                seq(
                    field("left", $.expression),
                    ",",
                    field("right", choice($.expression, $.comma_expression)),
                ),
            ),

        argument_list: ($) =>
            // prec.left(
            // PREC.CALL + 2, // Increase precedence for argument lists
            seq("(", commaSep(choice($.expression, $.compound_statement)), ")"),
        // ),

        field_expression: ($) =>
            seq(
                prec(
                    PREC.FIELD,
                    seq(
                        field("argument", $.expression),
                        // field("operator", choice(".", "->")),
                        // No arrow pointers in NetLinx, only dot notation
                        field("operator", choice(".")),
                    ),
                ),
                field("field", $._field_identifier),
            ),

        parenthesized_expression: ($) =>
            seq(
                "(",
                choice($.expression, $.comma_expression, $.compound_statement),
                ")",
            ),

        // // When setting a channel: [device, channel] = value
        // device_channel_assignment_expression: ($) =>
        //     prec.right(
        //         PREC.ASSIGNMENT,
        //         seq(
        //             $.device_channel_reference_expression,
        //             field("operator", "="),
        //             field("value", $.expression),
        //         ),
        //     ),

        // // When reading a channel: value = [device, channel]
        // device_channel_reference_expression: ($) =>
        //     prec.dynamic(
        //         -10,
        //         seq(
        //             "[",
        //             field("device", $.expression),
        //             ",",
        //             field("channel", $.expression),
        //             "]",
        //         ),
        //     ),

        // String Expressions in NetLinx are like an interpolated string
        string_expression: ($) => seq('"', commaSep1($.expression), '"'),

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

        string_literal: ($) =>
            seq(
                "'",
                alias(token.immediate(prec(1, /[^'\n]*/)), $.string_content),
                "'",
            ),

        literal: ($) => choice($.number_literal, $.string_literal),

        device_literal: ($) =>
            prec.right(
                PREC.FIELD + 10, // High precedence
                seq(
                    field("device", prec.dynamic(PREC.FIELD + 5, $.expression)),
                    ":",
                    field("port", prec.dynamic(PREC.FIELD + 5, $.expression)),
                    ":",
                    field("system", prec.dynamic(PREC.FIELD + 5, $.expression)),
                ),
            ),

        number_literal: ($) => choice($.decimal_literal, $.hex_literal),

        decimal_literal: (_) => /[-+]?\d+/,

        hex_literal: (_) => /\$[0-9a-fA-F]+/,

        true: (_) => token(choice("TRUE", "true")),
        false: (_) => token(choice("FALSE", "false")),

        identifier: (_) => /[_a-zA-Z][_a-zA-Z0-9]*/,

        _type_identifier: ($) =>
            prec.right(
                2, // Higher than regular identifier
                alias($.identifier, $.type_identifier),
            ),

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

module.exports.PREC = PREC;
module.exports.commaSep = commaSep;
module.exports.commaSep1 = commaSep1;
