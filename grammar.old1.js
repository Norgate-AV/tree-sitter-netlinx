/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("./keywords");
const netlinx = require("./netlinx");
const directives = require("./directives");
const functions = require("./functions");

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

    conflicts: ($) => [
        [$.array_function_declarator, $._declarator],
        [$.array_function_declarator], // Add this line to resolve the self-conflict
        [$.array_declarator, $.abstract_array_declarator], // Add this line to resolve the new conflict
        [$.array_declarator, $.field_declaration],
        [$.structure_field], // Add this line to resolve the structure field conflict
        [$.structure_declaration], // Add this line to resolve the structure declaration conflict
        // Add these new conflicts for complex interactions
        [$._declarator, $.structure_field],
        [$.field_expression, $.netlinx_custom_function],
        [$.compound_statement, $.netlinx_custom_function],
        // Add these conflicts to resolve remaining issues
        [$.netlinx_custom_function, $.field_expression],
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

        // Add this conflict to resolve string expression vs literal interpretation
        [$.string_expression, $.literal],

        // Also add these more specific conflicts to help with string expressions
        [$.string_expression, $.string_literal],

        // Remove references to string_expression_repeat1 which no longer exists
        // [$.string_expression_repeat1, $.string_literal],

        // Add conflict between string content and literals specifically
        [$.string_element, $.literal],
        [$.string_element, $.string_literal],
        // [$.string_expression_repeat1, $.literal],

        // Additional conflicts to resolve string expressions and structure fields
        [$.string_expression, $.string_literal, $.expression],
        [$.string_element, $.expression, $.string_literal],
        [$.define_constant_section, $.constant_definition],
        [$.structure_field, $.array_declarator, $.expression],

        // Add these additional conflicts specifically to address structure parsing
        // Add specific structure field array conflicts
        [$.structure_field_declaration, $.array_declarator, $.identifier],
        [$.structure_field, $.expression, $.identifier],
        [$.array_declarator, $.expression, $.identifier],

        // Add specific conflicts for structure fields
        [$.structure_field_declaration, $.structure_field_array_declarator],
        [$.structure_field_array_declarator, $.expression],

        // Add specific conflicts for string expression parsing
        [$.string_expression, $.string_element],
        [$.string_expression, $.first_string_element],

        // Array handling conflicts
        [$.array_dimension, $.identifier],
        [$.array_dimension, $.expression],
        [$.array_declarator, $.expression],
        [$.array_declarator, $.identifier],
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

        program_name: ($) =>
            prec.right(
                PRECEDENCE.DIRECTIVE + 10, // Even higher precedence than directives
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
                optional($.argument_list),
            ),

        _block_item: ($) => choice($.declaration, $.statement),

        section: ($) => choice($.define_constant_section),

        define_constant_section: ($) =>
            seq(keywords.define_constant, repeat($.constant_definition)),

        constant_definition: ($) =>
            prec.right(
                5, // High precedence for constant definitions
                seq(
                    optional($.type_qualifier),
                    optional($.type_specifier),
                    field("name", $.identifier),
                    optional(field("array_declarator", $.array_declarator)),
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

        _abstract_declarator: ($) =>
            choice(
                // $.abstract_pointer_declarator,
                // $.abstract_function_declarator,
                $.abstract_array_declarator,
                // $.abstract_parenthesized_declarator,
            ),

        // Use separate rules for different array declaration patterns - keeping only one implementation
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

        initializer_list: ($) =>
            seq(
                "{",
                commaSep(
                    choice($.expression, $.string_literal, $.initializer_list),
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
                    // Use identifier directly instead of _type_identifier
                    $.identifier,
                ),
            ),

        struct_specifier: ($) =>
            prec.right(
                seq(
                    keywords.struct,
                    choice(
                        seq(
                            // Change this line to use identifier directly instead of _type_identifier
                            field("name", $.identifier),
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
                    // Add NetLinx structured types
                    keywords.dev,
                    keywords.devaddr,
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

        // Function that returns an array - moved earlier in the file
        array_function_declarator: ($) =>
            prec.right(
                PRECEDENCE.ARRAY_FUNCTION, // Use higher precedence than _declarator
                seq(
                    field("type_specifier", optional($.type_specifier)),
                    field("array_spec", $.array_declarator),
                    field("parameters", $.parameter_list),
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

        // _abstract_declarator: ($) =>
        //     choice(
        //         $.abstract_array_declarator,
        //         $.abstract_parenthesized_declarator,
        //     ),

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
        statement: ($) => choice(/*$.case_statement,*/ $._non_case_statement),

        _non_case_statement: ($) =>
            choice(
                // $.compound_statement,
                // $.if_statement,
                // $.switch_statement,
                // $.while_statement,
                // $.for_statement,
                // $.return_statement,
                // $.break_statement,
                // $.continue_statement,
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

        parenthesized_expression: ($) =>
            prec.left(
                PRECEDENCE.CALL, // Keep at CALL precedence but lower than argument_list
                seq("(", choice($.expression, $.comma_expression), ")"),
            ),

        field_designator: ($) => seq(".", $._field_identifier),

        string_literal: ($) =>
            prec.left(
                PRECEDENCE.CALL + 20, // Increased precedence from 15 to 20
                // Single-quoted string (common in NetLinx) - explicit token without internal parsing
                token(seq("'", /[^']*/, "'")),
            ),

        literal: ($) => choice($.number_literal, $.string_literal),

        // Update device_literal to properly support constants in expressions
        device_literal: ($) =>
            prec.right(
                PRECEDENCE.FIELD + 10, // High precedence
                seq(
                    field(
                        "device",
                        prec.dynamic(PRECEDENCE.FIELD + 5, $.expression),
                    ),
                    ":",
                    field(
                        "port",
                        prec.dynamic(PRECEDENCE.FIELD + 5, $.expression),
                    ),
                    ":",
                    field(
                        "system",
                        prec.dynamic(PRECEDENCE.FIELD + 5, $.expression),
                    ),
                ),
            ),

        number_literal: ($) => choice($.decimal_literal, $.hex_literal),

        decimal_literal: (_) => /[-+]?\d+/,

        hex_literal: (_) => /\$[0-9a-fA-F]+/,

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

        // Compiler directives
        directive: ($) =>
            choice(
                $.include_directive,
                $.define_directive,
                $.if_defined_directive,
                $.if_not_defined_directive,
                $.else_directive,
                $.end_if_directive,
                $.warn_directive,
            ),

        include_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(
                    directives.INCLUDE,
                    // Only allow single-quoted strings for NetLinx
                    token(seq("'", /[^']*/, "'")),
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

        if_defined_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(directives.IF_DEFINED, $.identifier),
            ),

        if_not_defined_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(directives.IF_NOT_DEFINED, $.identifier),
            ),

        else_directive: ($) => prec(PRECEDENCE.DIRECTIVE, directives.ELSE),

        end_if_directive: ($) => prec(PRECEDENCE.DIRECTIVE, directives.END_IF),

        warn_directive: ($) =>
            prec(
                PRECEDENCE.DIRECTIVE,
                seq(
                    directives.WARN,
                    // Only allow single-quoted strings for NetLinx
                    token(seq("'", /[^']*/, "'")),
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
