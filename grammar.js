/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("./keywords");
const netlinx = require("./netlinx");
const directives = require("./directives");

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
    CALL: 17, // Increased from 15 to be higher than UNARY and ARRAY_ACCESS
    ARRAY_ACCESS: 16,
    FIELD: 16,
    DIRECTIVE: 20,
    EVENT_PARAM: 90, // Add this constant for event parameter expressions
    EVENT_TYPE: 100, // Add this constant for event type expressions
};

module.exports = grammar({
    name: "netlinx",

    // All the previously listed conflicts are now warned as unnecessary
    // This means our precedence rules have successfully addressed these ambiguities
    conflicts: ($) => [
        // Empty - our precedence rules and grammar structure have resolved the ambiguities
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
        source_file: ($) =>
            seq(
                optional(repeat($.directive)),
                choice($.program_name, $.module_name),
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
            seq(keywords.define_device, repeat($.device_definition)),

        device_definition: ($) =>
            seq($.identifier, "=", $.device_literal, optional(";")),

        define_combine_section: ($) =>
            seq(keywords.define_combine, repeat($.combine_definition)),

        combine_definition: ($) => seq("(", commaSep1($.identifier), ")"),

        define_constant_section: ($) =>
            seq(keywords.define_constant, repeat($.constant_definition)),

        constant_definition: ($) =>
            prec.right(
                1, // Add explicit precedence higher than type_specifier (0)
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
            prec(
                0, // Lower precedence than variable_definition
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
                1, // Add precedence
                choice(
                    $.function_declarator,
                    $.array_declarator,
                    $.parenthesized_declarator,
                    $.identifier,
                ),
            ),

        _declaration_declarator: ($) =>
            prec(
                2, // Higher precedence than _declarator
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
            prec(
                1,
                seq(
                    field("declarator", $._declarator),
                    "[",
                    repeat(choice($.type_qualifier)),
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
            choice(
                prec.right(
                    seq(
                        choice($.expression, $.comma_expression),
                        optional(";"),
                    ),
                ),
                ";",
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
                1, // Higher precedence than type_specifier for resolving conflicts
                choice($._expression_not_binary, $.binary_expression),
            ),

        _expression_not_binary: ($) =>
            choice(
                $.assignment_expression,
                $.unary_expression,
                $.update_expression,
                $.call_expression,
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
                        choice($.netlinx_function_call, $.expression),
                    ),
                    field("arguments", optional($.argument_list)),
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
            choice(
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
                $.data_field_access,
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
                "ONLINE",
                "OFFLINE",
                "STRING",
                "COMMAND",
                "ERROR",
                "ONERROR",
                "PUSH",
                "RELEASE",
                "HOLD",
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
                "SEND_COMMAND",
                field("device", $.expression),
                ",",
                field("command", choice($.string_literal, $.identifier)),
            ),

        send_string: ($) =>
            seq(
                "SEND_STRING",
                field("device", $.expression),
                ",",
                field("string", choice($.string_literal, $.identifier)),
            ),

        send_level: ($) =>
            seq(
                "SEND_LEVEL",
                field("device", $.expression),
                ",",
                field("level", $.expression),
                ",",
                field("value", $.expression),
            ),

        create_buffer: ($) =>
            prec.right(
                seq(
                    "CREATE_BUFFER",
                    field("buffer", $.identifier),
                    optional(seq(",", field("size", $.expression))),
                ),
            ),

        clear_buffer: ($) => seq("CLEAR_BUFFER", field("buffer", $.identifier)),

        set_length_array: ($) =>
            seq(
                "SET_LENGTH_ARRAY",
                field("array", $.identifier),
                ",",
                field("size", $.expression),
            ),

        timeline_function: ($) => choice($.timeline_create, $.timeline_kill),

        timeline_create: ($) =>
            prec.right(
                seq(
                    "TIMELINE_CREATE",
                    field("timeline", $.expression),
                    ",",
                    field("events", $.argument_list),
                    optional(
                        seq(
                            ",",
                            field(
                                "mode",
                                choice(
                                    "TIMELINE_ABSOLUTE",
                                    "TIMELINE_RELATIVE",
                                ),
                            ),
                            optional(
                                seq(
                                    ",",
                                    field(
                                        "repeat",
                                        choice(
                                            "TIMELINE_REPEAT",
                                            "TIMELINE_ONCE",
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),

        timeline_kill: ($) =>
            seq("TIMELINE_KILL", field("timeline", $.expression)),

        // Array access expression
        array_access_expression: ($) =>
            prec.left(
                PRECEDENCE.ARRAY_ACCESS,
                seq(
                    field("array", $.expression),
                    "[",
                    field("index", $.expression),
                    "]",
                ),
            ),

        // DATA structure field access
        data_field_access: ($) =>
            prec(
                PRECEDENCE.FIELD + 1,
                seq(
                    "DATA",
                    ".",
                    field(
                        "field",
                        choice("TEXT", "ONLINE", "OFFLINE", "COMMAND", "VALUE"),
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
