/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("./keywords");
const netlinx = require("./netlinx");
const directives = require("./directives");

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
    conflicts: ($) => [
        [$.array_function_declarator, $._declarator],
        [$.array_function_declarator], // Add this line to resolve the self-conflict
        [$.array_declarator, $.abstract_array_declarator], // Add this line to resolve the new conflict
        [$.array_declarator, $.field_declaration],
        [$.device_ref_expression, $.field_expression],
        [$.structure_field], // Add this line to resolve the structure field conflict
        [$.structure_declaration], // Add this line to resolve the structure declaration conflict
        // Add these new conflicts for complex interactions
        [$._declarator, $.structure_field],
        [$.field_expression, $.netlinx_custom_function],
        [$.compound_statement, $.netlinx_custom_function],
        // Add these conflicts to resolve remaining issues
        [
            $.netlinx_custom_function,
            $.field_expression,
            $.device_ref_expression,
        ],
        [$.identifier, $.structure_declaration],
        [$.field_expression], // Add this line to resolve the field_expression conflict
        [$.type_specifier, $.structure_declaration], // Add this line for the new conflict
        [$.type_specifier, $._declarator], // Add this line to resolve the conflict between type_specifier and _declarator
        [$.type_specifier, $._declarator, $._declaration_declarator], // Add this to resolve three-way conflict
        // Add additional conflicts to resolve parsing issues
        [$.structure_field, $.primitive_type, $.type_specifier],
        [$.netlinx_custom_function, $.expression],
        // Add conflict to resolve function_reference + semicolon issue
        [$.expression_statement, $.expression, $.netlinx_custom_function],
        [$.function_reference, $.expression_statement],
        // Add conflict to resolve type_specifier vs expression vs function_reference
        [$.type_specifier, $.expression, $.function_reference],
        [$._type_identifier, $.identifier, $.function_reference],
        // Add conflict for structure_declaration content
        [$.type_specifier, $._declarator, $.structure_declaration_content],
        // Remove the problematic reference to structure_declaration_repeat1
        [
            $.identifier,
            $.type_specifier,
            $._declarator,
            // $.structure_declaration_repeat1,  <-- This line was causing the problem
        ],
        // Add a simpler conflict that doesn't reference the undefined symbol
        [$.identifier, $.type_specifier, $.structure_declaration],
        // Add conflict specifically for content inside structures
        [
            $.identifier,
            $._declarator,
            $.type_specifier,
            $.structure_declaration_content,
        ],
        // Add more specific conflict entries to resolve structure content parsing issues
        [$.structure_field, $.identifier, $.primitive_type],
        [$.structure_field, $.array_declarator],
        [$.structure_field, $.structure_declaration],

        // Add conflicts specifically for array access in complex contexts
        [$.array_access_expression, $.field_expression, $.expression],

        // Add conflict for parameterized expressions
        [$.parameter_list, $.argument_list, $.parenthesized_expression],

        // Add more specific structure field conflicts
        [$.structure_field, $.structure_declaration_content],
        [$.structure_field, $.type_specifier, $.identifier],
        [$.structure_field, $.primitive_type, $.array_declarator],

        // Better handling of array access expressions
        [$.array_access_expression, $.field_expression],
        [$.array_access_expression, $.expression, $.identifier],

        // Better field expression conflict resolution
        [$.field_expression, $.expression, $.identifier],
        [$.field_expression, $.call_expression],

        // Explicit handling of multi-level field expressions
        [$.field_expression, $.field_expression, $.expression],

        // Add this specific conflict to resolve the parse error
        [$.field_expression, $.function_reference],

        // Add related conflicts to ensure comprehensive resolution
        [$.field_expression, $.function_reference],
        // Add more specific conflicts for NetLinx custom functions with colon
        [$.field_expression, $.identifier],
        [$.field_expression, $.function_reference],

        // Add structure content conflicts with higher specificity
        [$.structure_declaration, $.structure_field, $.identifier],

        // Add more specific conflicts for structure and field handling
        [$.structure_declaration, $.structure_field],
        [$.structure_field, $.field_declaration],
        [$.structure_field, $.primitive_type],

        // Add conflicts specifically for NetLinx custom function colon syntax
        [$.field_expression],
        [$.function_reference, $.field_expression, $.identifier],
        [$.function_reference],

        // Enhanced structure-related conflicts with higher specificity
        [$.structure_declaration, $.structure_field],
        [$.structure_field, $.field_declaration],
        [$.structure_field, $.primitive_type],
        [$.structure_field, $.identifier],
        [$.structure_declaration, $.identifier],

        // Better resolution for NetLinx custom functions
        [$.field_expression],
        [$.function_reference, $.field_expression, $.identifier],
        [$.function_reference],

        // Add missing conflicts for field expression and function handling
        [$.field_expression, $.expression_statement],
        [$.structure_field, $.array_declarator],

        // Add more explicit conflicts for structure declarations
        [$.structure_declaration, $._declarator],
        [$.structure_body, $.compound_statement],
        [$.structure_declaration, $.identifier, $.compound_statement],

        // More specific conflicts for NetLinx custom functions
        [$.function_reference, $.field_expression],
        [$.expression_statement],

        // Add these new conflicts to resolve structure_field_declaration issues
        [$.structure_field_declaration],
        [$.structure_field_declaration, $.type_specifier, $.identifier],
        [$.structure_field_declaration, $.array_declarator],
        [$.structure_field_declaration, $.array_declarator, $.type_specifier],
        [$.structure_field_declaration, $.structure_declaration_content],
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
                // Allow program_name/module_name and directives in any order
                repeat(
                    choice(
                        $.directive,
                        $.program_name,
                        $.module_name,
                        $.comment,
                    ),
                ),
                // Then parse all the sections
                repeat($.section),
            ),

        program_name: ($) => seq(keywords.program_name, "=", $.string_literal),

        module_name: ($) =>
            seq(
                keywords.module_name,
                "=",
                $.string_literal,
                optional($.argument_list),
            ),

        _block_item: ($) => choice($.declaration, $.statement),

        section: ($) =>
            choice(
                $.define_device_section,
                $.define_combine_section,
                $.define_constant_section,
                $.define_type_section,
                $.define_variable_section,
                $.define_connect_level_section,
                $.define_latching_section,
                $.define_mutually_exclusive_section,
                $.define_toggling_section,
                $.define_call_section,
                $.define_function_section,
                $.define_start_section,
                $.define_event_section,
                $.define_program_section,
            ),

        define_device_section: ($) =>
            prec(
                PRECEDENCE.SECTION_DEFINITION,
                seq(keywords.define_device, repeat($.device_definition)),
            ),

        device_definition: ($) =>
            seq($.identifier, "=", $.device_literal, optional(";")),

        define_combine_section: ($) =>
            seq(keywords.define_combine, repeat($.combine_definition)),

        combine_definition: ($) => seq("(", commaSep1($.identifier), ")"),

        define_constant_section: ($) =>
            seq(keywords.define_constant, repeat($.constant_definition)),

        constant_definition: ($) =>
            prec.right(
                3, // Increase precedence from 1 to 3 to better handle array cases
                choice(
                    // Standard constant definition
                    seq(
                        optional($.type_qualifier),
                        optional($.type_specifier),
                        field("name", $.identifier),
                        optional(field("array_declarator", $.array_declarator)),
                        "=",
                        field("value", $.expression),
                        optional(";"),
                    ),
                    // Structure constant definition
                    seq(optional($.type_qualifier), $.structure_declaration),
                ),
            ),

        define_function_section: ($) =>
            seq(
                keywords.define_function,
                prec.right(
                    2, // Use higher precedence to resolve conflicts
                    $.function_definition,
                ),
            ),

        define_start_section: ($) =>
            seq(keywords.define_start, repeat($.statement)),

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
            prec.right(
                1, // Increase from 0 to 1 to resolve conflict with structure_declaration
                choice(
                    $.struct_specifier,
                    $.primitive_type,
                    $._type_identifier,
                ),
            ),

        struct_specifier: ($) =>
            prec.right(
                seq(
                    keywords.struct,
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
                    $.array_function_declarator,
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

        _abstract_declarator: ($) =>
            choice(
                $.abstract_array_declarator,
                $.abstract_parenthesized_declarator,
            ),

        function_declarator: ($) =>
            prec.right(
                1,
                seq(
                    field("declarator", $._declarator),
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
            choice(
                // With declarator (normal case)
                prec(
                    3, // Increase precedence from 1 to 3 to resolve ambiguities
                    seq(
                        field("declarator", $._declarator),
                        "[",
                        repeat(choice($.type_qualifier)),
                        field("size", optional(choice($.expression, "*"))),
                        "]",
                    ),
                ),
                // Empty array declaration with higher precedence
                prec(
                    4, // Even higher precedence for empty array declarations
                    seq(
                        field("declarator", $._declarator),
                        token.immediate("["), // Force immediate attachment of opening bracket
                        "]",
                    ),
                ),
                // Without declarator (for empty array declarations)
                prec(
                    1,
                    seq(
                        "[",
                        repeat(choice($.type_qualifier)),
                        field("size", optional(choice($.expression, "*"))),
                        "]",
                    ),
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
                    repeat(choice($.type_qualifier)),
                    field("size", optional(choice($.expression, "*"))),
                    "]",
                ),
            ),

        parameter_list: ($) =>
            prec.left(
                PRECEDENCE.CALL + 1,
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
                    prec.dynamic(15, $.netlinx_custom_function),
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

        return_statement: ($) =>
            prec.right(
                seq(
                    keywords.return,
                    optional(choice($.expression, $.comma_expression)),
                    optional(";"),
                ),
            ),

        // Add explicit right associativity to resolve the semicolon ambiguity
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
                $.function_reference,
                $.field_expression,
                $.array_access_expression,
                $.identifier,
                $.literal,
                $.string_expression,
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
                $.array_access_expression,
                $.parenthesized_expression,
            ),

        unary_expression: ($) =>
            prec.right(
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

            return prec.dynamic(
                PRECEDENCE.DEFAULT,
                choice(
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
                ),
            );
        },

        update_expression: ($) => {
            const argument = field("argument", $.expression);
            const operator = field("operator", choice("--", "++"));
            return prec.right(PRECEDENCE.UNARY, seq(argument, operator));
        },

        call_expression: ($) =>
            prec.left(
                PRECEDENCE.CALL,
                seq(
                    field(
                        "function",
                        choice(
                            $.netlinx_function_call,
                            $.identifier,
                            alias(
                                $.parenthesized_expression,
                                $.function_expression,
                            ),
                            alias($.field_expression, $.method_expression),
                            alias(
                                $.array_access_expression,
                                $.indexed_function,
                            ),
                        ),
                    ),
                    field("arguments", $.argument_list),
                ),
            ),

        comma_expression: ($) =>
            prec.right(
                // Change to right associativity
                PRECEDENCE.DEFAULT, // Lower precedence than argument_list
                seq(
                    field("left", $.expression),
                    ",",
                    field("right", choice($.expression, $.comma_expression)),
                ),
            ),

        argument_list: ($) =>
            prec.left(
                PRECEDENCE.CALL + 2, // Increase precedence for argument lists
                seq(
                    "(",
                    commaSep(choice($.expression, $.compound_statement)),
                    ")",
                ),
            ),

        field_expression: ($) =>
            prec.dynamic(
                PRECEDENCE.FIELD,
                choice(
                    // Standard field access
                    seq(
                        field(
                            "object",
                            choice(
                                $.identifier,
                                alias($.call_expression, $.method_object),
                                alias(
                                    $.array_access_expression,
                                    $.indexed_object,
                                ),
                                $.parenthesized_expression,
                            ),
                        ),
                        field("operator", choice(".", ":")),
                        field(
                            "field",
                            choice($._field_identifier, $.identifier),
                        ),
                    ),
                    // Special case for NetLinX data field access
                    $.data_field_access,
                ),
            ),

        parenthesized_expression: ($) =>
            prec.left(
                PRECEDENCE.CALL, // Keep at CALL precedence but lower than argument_list
                seq("(", choice($.expression, $.comma_expression), ")"),
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
                    field("designator", repeat1(choice($.field_designator))),
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

        string_expression: ($) =>
            prec.left(
                PRECEDENCE.CALL - 1, // Lower precedence than string_literal
                seq('"', commaSep1($.expression), '"'),
            ),

        literal: ($) => choice($.number_literal, $.string_literal),

        device_literal: ($) =>
            seq(
                $.decimal_literal,
                ":",
                $.decimal_literal,
                ":",
                $.decimal_literal,
            ),

        number_literal: ($) => choice($.decimal_literal, $.hex_literal),

        decimal_literal: (_) => /[-+]?\d+/,

        hex_literal: (_) => /\$[0-9a-fA-F]+/,

        string_literal: ($) =>
            prec.left(
                PRECEDENCE.CALL, // Higher precedence than string_expression
                choice(
                    seq("'", /[^']*/, "'"),
                    seq(
                        '"',
                        repeat(
                            choice(/[^$"\\]+/, $.string_interpolation, /\\./),
                        ),
                        '"',
                    ),
                ),
            ),

        string_interpolation: ($) =>
            prec(PRECEDENCE.CALL + 1, seq("${", $.expression, "}")),

        identifier: (_) => /[_a-zA-Z]\w*/,

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

        // Section definitions
        define_type_section: ($) =>
            seq(keywords.define_type, repeat($.type_definition)),

        type_definition: ($) =>
            seq(keywords.structure, $.identifier, $.field_declaration_list),

        define_variable_section: ($) =>
            seq(keywords.define_variable, repeat($.variable_definition)),

        variable_definition: ($) =>
            prec.right(
                1, // Keep higher precedence than type_specifier
                seq(
                    optional($.type_qualifier),
                    optional($.type_specifier),
                    $.identifier,
                    optional($.array_declarator),
                    optional(seq("=", $.expression)),
                    optional(";"),
                ),
            ),

        define_connect_level_section: ($) =>
            seq(
                keywords.define_connect_level,
                repeat($.connect_level_definition),
            ),

        connect_level_definition: ($) =>
            seq(
                $.device_literal,
                ".",
                $.decimal_literal,
                "->",
                $.device_literal,
                ".",
                $.decimal_literal,
            ),

        define_latching_section: ($) =>
            seq(keywords.define_latching, repeat($.latching_definition)),

        latching_definition: ($) => seq("(", commaSep1($.identifier), ")"),

        define_mutually_exclusive_section: ($) =>
            seq(
                keywords.define_mutually_exclusive,
                repeat($.mutually_exclusive_definition),
            ),

        mutually_exclusive_definition: ($) =>
            seq("(", commaSep1($.identifier), ")"),

        define_toggling_section: ($) =>
            seq(keywords.define_toggling, repeat($.toggling_definition)),

        toggling_definition: ($) => seq("(", commaSep1($.identifier), ")"),

        define_call_section: ($) =>
            seq(keywords.define_call, repeat($.call_definition)),

        call_definition: ($) => seq($.identifier, $.argument_list),

        define_event_section: ($) =>
            seq(keywords.define_event, repeat($.event_definition)),

        event_definition: ($) =>
            seq($.event_type, field("body", $.event_block)),

        event_block: ($) => prec(1, seq("{", repeat($.subevent_handler), "}")),

        subevent_handler: ($) =>
            prec(1, seq($.subevent_type, ":", $.compound_statement)),

        subevent_type: (_) =>
            choice(
                /ONLINE/i,
                /OFFLINE/i,
                /STRING/i,
                /COMMAND/i,
                /ERROR/i,
                /ONERROR/i,
                /PUSH/i,
                /RELEASE/i,
                /HOLD/i,
            ),

        event_type: ($) =>
            prec.right(
                PRECEDENCE.EVENT_TYPE, // Use named constant instead of raw number
                choice(
                    seq(
                        keywords.button_event,
                        // Use simple expressions that can't be confused with binary operations
                        field("device", $._event_param_expression),
                        field("channel", $._event_param_expression),
                    ),
                    seq(
                        keywords.channel_event,
                        field("device", $._event_param_expression),
                        field("channel", $._event_param_expression),
                    ),
                    seq(
                        keywords.level_event,
                        field("device", $._event_param_expression),
                        field("level", $._event_param_expression),
                    ),
                    seq(
                        keywords.data_event,
                        field("device", $._event_param_expression),
                    ),
                    seq(
                        keywords.timeline_event,
                        field("timeline", $._event_param_expression),
                    ),
                ),
            ),

        // Special rule for expressions in event parameters that prevents binary operation conflicts
        _event_param_expression: ($) =>
            prec(
                PRECEDENCE.EVENT_PARAM, // Use named constant instead of raw number
                choice(
                    alias($.identifier, $.event_identifier),
                    alias($.decimal_literal, $.event_literal),
                    alias($.parenthesized_expression, $.event_expression),
                ),
            ),

        define_program_section: ($) =>
            seq(
                keywords.define_program,
                repeat(choice($.statement, $.device_assignment)),
            ),

        device_assignment: ($) =>
            prec(
                PRECEDENCE.CALL + 3, // Higher precedence than other expression types
                seq(
                    "[",
                    field("device", $.expression),
                    optional(seq(",", field("channel", $.expression))),
                    "]",
                    "=",
                    field("value", $.parenthesized_expression),
                ),
            ),

        // Compiler directives
        directive: ($) =>
            choice(
                $.include_directive,
                $.define_directive,
                $.if_directive,
                $.ifdef_directive,
                $.ifndef_directive,
                $.else_directive,
                $.endif_directive,
                $.undef_directive,
                $.pragma_directive,
            ),

        include_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(
                    directives.INCLUDE,
                    choice(seq("'", /[^']*/, "'"), seq('"', /[^"]*/, '"')),
                ),
            ),

        define_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(
                    directives.DEFINE,
                    $.identifier,
                    optional(choice($.number_literal, $.string_literal)),
                ),
            ),

        if_directive: ($) =>
            prec.right(
                PRECEDENCE.DIRECTIVE,
                seq(directives.IF, field("condition", $.expression)),
            ),

        ifdef_directive: ($) =>
            prec(PRECEDENCE.DIRECTIVE, seq(directives.IFDEF, $.identifier)),

        ifndef_directive: ($) =>
            prec(PRECEDENCE.DIRECTIVE, seq(directives.IFNDEF, $.identifier)),

        else_directive: ($) => prec(PRECEDENCE.DIRECTIVE, directives.ELSE),

        endif_directive: ($) => prec(PRECEDENCE.DIRECTIVE, directives.ENDIF),

        undef_directive: ($) =>
            prec(PRECEDENCE.DIRECTIVE, seq(directives.UNDEF, $.identifier)),

        pragma_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(
                    directives.PRAGMA,
                    choice(...directives.PRAGMA_OPTIONS, $.identifier),
                ),
            ),

        // NetLinX specific functions
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
                /SEND_COMMAND/i,
                field("device", $.expression),
                ",",
                field("command", choice($.string_literal, $.identifier)),
            ),

        send_string: ($) =>
            seq(
                /SEND_STRING/i,
                field("device", $.expression),
                ",",
                field("string", choice($.string_literal, $.identifier)),
            ),

        send_level: ($) =>
            seq(
                /SEND_LEVEL/i,
                field("device", $.expression),
                ",",
                field("level", $.expression),
                ",",
                field("value", $.expression),
            ),

        create_buffer: ($) =>
            prec.right(
                seq(
                    /CREATE_BUFFER/i,
                    field("buffer", $.identifier),
                    optional(seq(",", field("size", $.expression))),
                ),
            ),

        clear_buffer: ($) =>
            seq(/CLEAR_BUFFER/i, field("buffer", $.identifier)),

        set_length_array: ($) =>
            seq(
                /SET_LENGTH_ARRAY/i,
                field("array", $.identifier),
                ",",
                field("size", $.expression),
            ),

        timeline_function: ($) => choice($.timeline_create, $.timeline_kill),

        timeline_create: ($) =>
            prec.right(
                seq(
                    /TIMELINE_CREATE/i,
                    field("timeline", $.expression),
                    ",",
                    field("events", $.argument_list),
                    optional(
                        seq(
                            ",",
                            field(
                                "mode",
                                choice(
                                    /TIMELINE_ABSOLUTE/i,
                                    /TIMELINE_RELATIVE/i,
                                ),
                            ),
                            optional(
                                seq(
                                    ",",
                                    field(
                                        "repeat",
                                        choice(
                                            /TIMELINE_REPEAT/i,
                                            /TIMELINE_ONCE/i,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),

        timeline_kill: ($) =>
            seq(/TIMELINE_KILL/i, field("timeline", $.expression)),

        // Array access expression
        array_access_expression: ($) =>
            prec.dynamic(
                PRECEDENCE.ARRAY_ACCESS,
                seq(
                    field(
                        "array",
                        choice(
                            // Make array base more explicit
                            alias($.identifier, $.array_identifier),
                            alias($.field_expression, $.field_array),
                            alias($.call_expression, $.call_array),
                            $.parenthesized_expression,
                        ),
                    ),
                    "[",
                    choice(
                        field("index", $.expression),
                        seq(
                            field("index1", $.expression),
                            ",",
                            field("index2", $.expression),
                        ),
                    ),
                    "]",
                ),
            ),

        // DATA structure field access
        data_field_access: ($) =>
            prec(
                PRECEDENCE.FIELD + 1,
                seq(
                    /DATA/i,
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

        // Enhanced function reference with special handling of colons
        function_reference: ($) =>
            prec.dynamic(
                PRECEDENCE.FUNCTION_REF + 20, // Very high precedence
                alias($.identifier, $.function_identifier),
            ),

        // Add special handling for colon-separated expressions often seen in NetLinX
        device_ref_expression: ($) =>
            prec(
                PRECEDENCE.FIELD,
                seq(
                    field("arg1", $.expression),
                    ":",
                    field("arg2", $.expression),
                ),
            ),

        // Function that returns an array
        array_function_declarator: ($) =>
            prec.right(
                PRECEDENCE.ARRAY_FUNCTION, // Use higher precedence than _declarator
                seq(
                    field("type_specifier", optional($.type_specifier)),
                    field("array_spec", $.array_declarator),
                    field("parameters", $.parameter_list),
                ),
            ),

        // Add special handling for NetLinx dot notation in device literals
        dot_notation: ($) =>
            prec(
                PRECEDENCE.FIELD,
                seq(
                    field("object", choice($.identifier, $.device_literal)),
                    ".",
                    field("property", $.expression),
                ),
            ),

        // More explicit structure content rule with higher precedence
        structure_declaration_content: ($) =>
            prec.right(
                18,
                repeat1(
                    choice(
                        alias($.structure_field_declaration, $.structure_field),
                        $.comment,
                    ),
                ),
            ),

        // Enhanced structure declaration with significantly higher precedence
        structure_declaration: ($) =>
            prec.dynamic(
                30, // Very high precedence to ensure it takes priority
                seq(
                    optional(field("qualifier", $.type_qualifier)),
                    field("keyword", keywords.structure),
                    field("name", $.identifier),
                    field(
                        "body",
                        alias($.structure_body, $.structure_definition_body),
                    ),
                ),
            ),

        // Dedicated structure body rule with higher precedence
        structure_body: ($) =>
            prec.dynamic(
                28,
                seq(
                    token.immediate("{"), // Use immediate to force brace attachment
                    optional(
                        seq(
                            repeat(
                                choice(
                                    alias(
                                        $.structure_field_declaration,
                                        $.structure_field,
                                    ),
                                    $.comment,
                                ),
                            ),
                        ),
                    ),
                    "}",
                ),
            ),

        // Enhanced structure field with higher precedence
        structure_field: ($) =>
            prec.right(
                13, // Increased from 10 to match content rule
                seq(
                    optional($.type_qualifier),
                    field("type", $.type_specifier),
                    field("name", $.identifier),
                    optional(field("array", $.array_declarator)),
                    optional(";"),
                ),
            ),

        // Completely separate field declaration rule for structures to avoid conflicts
        structure_field_declaration: ($) =>
            prec.left(
                // Change from prec.dynamic to prec.left to specify associativity
                26,
                seq(
                    optional($.type_qualifier),
                    field("type", $.type_specifier),
                    field("name", $.identifier),
                    optional(field("array", $.array_declarator)),
                    optional(";"),
                ),
            ),

        // Add a special rule for NetLinx custom functions with compound statements
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
