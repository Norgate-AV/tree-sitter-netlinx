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
        [$._block_item, $.statement],
        // [$.array_declarator, $.device_channel_reference_expression],
        [$.local_variable_declaration],
        [$.array_dimension],
        [$._type_identifier, $.identifier],
        // [
        //     $.constant_definition,
        //     $.global_variable_definition,
        //     $.assignment_expression,
        // ],
        // [$.preproc_if_defined, $.section],
        // [$.preproc_if_not_defined, $.section],
        // [$.preproc_else, $.section],
        // [$.device_channel_reference_expression, $.subscript_expression],
        // [$.assignment_expression, $.device_channel_assignment_expression],
        // [$._top_level_item, $.section],
        [$.global_variable_definition, $.latching_definition],
        [$.latching_definition, $.toggling_definition],
        [
            $.device_definition,
            $.constant_definition,
            $.global_variable_definition,
        ],
        [$.combine_definition, $.connect_level_definition],
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
        source_file: ($) => repeat($._top_level_item),

        // Top-level context - matches <module section list>
        _top_level_item: ($) =>
            choice(
                // Preprocessor
                $.preproc_directive,
                $.comment,

                // Sections
                $.section,
                $.program_name,
                $.module_name,
                $.define_function,
                $.define_call,
                $.define_module,

                // Top-Level Declarations
                $.constant_definition,
                $.global_variable_definition,
                $.struct_definition,
                $.device_definition,
                $.combine_definition,
                $.connect_level_definition,
                $.mutually_exclusive_definition,
                $.toggling_definition,
                $.latching_definition,
            ),

        // Section-level context - matches <language statement list>
        _section_item: ($) =>
            choice(
                // Preprocessor
                $.preproc_directive,
                $.comment,

                // Declarations and definitions
                $.constant_definition,
                $.global_variable_definition,
                $.function_definition,
                $.declaration,
                $.struct_definition,

                // Statements
                // $.local_variable_declaration,
                $.statement,
                $.compound_statement,
                $.expression_statement,
            ),

        // Block-level context - matches <compound statement inside {}>
        _block_item: ($) =>
            choice(
                // Preprocessor
                $.preproc_directive,
                $.comment,

                // Block-level declarations
                $.local_variable_declaration,

                // Statements
                $.statement,
                $.expression_statement,
                $.compound_statement,
            ),

        program_name: ($) =>
            prec.right(
                PREC.DIRECTIVE + 10,
                seq(keywords.program_name, "=", $.string_literal),
            ),

        module_name: ($) =>
            prec.right(
                seq(
                    keywords.module_name,
                    "=",
                    $.string_literal,
                    optional(field("parameters", $.parameter_list)),
                ),
            ),

        // Preprocessor
        preproc_directive: ($) =>
            choice(
                $.preproc_include,
                $.preproc_define,
                $.preproc_if_defined,
                $.preproc_if_not_defined,
                $.preproc_warn,
            ),

        preproc_include: ($) =>
            prec(
                PREC.DIRECTIVE,
                seq(
                    preprocessor(directives.include),
                    $.string_literal,
                    token.immediate(/\r?\n/),
                ),
            ),

        preproc_define: ($) =>
            prec(
                PREC.DIRECTIVE,
                seq(
                    preprocessor(directives.define),
                    $.identifier,
                    optional(choice($.number_literal, $.string_literal)),
                    token.immediate(/\r?\n/),
                ),
            ),

        preproc_warn: ($) =>
            prec(
                PREC.DIRECTIVE,
                seq(
                    preprocessor(directives.warn),
                    $.string_literal,
                    token.immediate(/\r?\n/),
                ),
            ),

        // preproc_if_defined: ($) =>
        //     seq(
        //         preprocessor(directives.if_defined),
        //         field("name", $.identifier),
        //         "\n",
        //         repeat($._top_level_item),
        //         optional($.preproc_else),
        //         $.preproc_end_if,
        //     ),

        // preproc_if_not_defined: ($) =>
        //     seq(
        //         preprocessor(directives.if_not_defined),
        //         field("name", $.identifier),
        //         "\n",
        //         repeat($._top_level_item),
        //         optional($.preproc_else),
        //         $.preproc_end_if,
        //     ),

        // preproc_else: ($) =>
        //     seq(preprocessor(directives.else), repeat($._top_level_item)),

        // preproc_end_if: (_) => preprocessor(directives.end_if),

        ...preprocIf(""),
        ...preprocIf("_in_section"),
        ...preprocIf("_in_block"),

        // preproc_directive: (_) => /#[a-zA-Z0-9]\w*/,

        // Main Grammar

        section: ($) =>
            choice(
                $.define_device_section,
                $.define_combine_section,
                $.define_connect_level_section,
                $.define_constant_section,
                $.define_type_section,
                $.define_mutually_exclusive_section,
                $.define_latching_section,
                $.define_toggling_section,
                $.define_variable_section,
                $.define_start_section,
                $.define_event_section,
                $.define_program_section,
            ),

        define_device_section: (_) => keywords.define_device,
        define_combine_section: (_) => keywords.define_combine,
        define_connect_level_section: (_) => keywords.define_connect_level,
        define_constant_section: (_) => keywords.define_constant,
        define_type_section: (_) => keywords.define_type,
        define_mutually_exclusive_section: (_) =>
            keywords.define_mutually_exclusive,
        define_latching_section: (_) => keywords.define_latching,
        define_toggling_section: (_) => keywords.define_toggling,
        define_variable_section: (_) => keywords.define_variable,
        define_event_section: (_) => keywords.define_event,
        define_start_section: ($) =>
            prec.right(
                PREC.SECTION_DEFINITION,
                seq(keywords.define_start, repeat($._block_item)),
            ),
        define_program_section: ($) =>
            prec.right(
                PREC.SECTION_DEFINITION,
                seq(keywords.define_program, repeat($._block_item)),
            ),

        define_function: ($) =>
            seq(keywords.define_function, $.function_definition),
        define_call: ($) => seq(keywords.define_call, $.call_definition),
        define_module: ($) => seq(keywords.define_module, $.module_definition),

        device_definition: ($) =>
            seq($.identifier, "=", $.device_literal, optional(";")),

        combine_definition: ($) =>
            seq("(", commaSep1($.expression), ")", optional(";")),

        connect_level_definition: ($) =>
            seq("(", commaSep1($.expression), ")", optional(";")),

        constant_definition: ($) =>
            prec.right(
                10,
                seq(
                    optional(keywords.constant),
                    optional(field("type", $.type_specifier)),
                    field("name", $.identifier),
                    optional(field("dimensions", $.array_dimension)),
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

        mutually_exclusive_definition: ($) =>
            prec.right(
                5,
                seq(
                    "(",
                    commaSep1(
                        choice(
                            $.device_channel_reference_expression,
                            $.channel_range_expression,
                            $.identifier,
                        ),
                    ),
                    ")",
                    optional(";"),
                ),
            ),

        channel_range_expression: ($) =>
            prec.dynamic(
                PREC.FIELD,
                seq(
                    $.device_channel_reference_expression,
                    "..",
                    $.device_channel_reference_expression,
                ),
            ),

        latching_definition: ($) =>
            prec.right(
                5,
                seq(
                    choice(
                        $.device_channel_reference_expression,
                        $.channel_range_expression,
                        $.identifier,
                    ),
                    optional(";"),
                ),
            ),

        toggling_definition: ($) =>
            prec.right(5, seq(choice($.device_channel_reference_expression))),

        global_variable_definition: ($) =>
            prec.right(
                5,
                seq(
                    optional(field("qualifier", $.type_qualifier)),
                    optional(
                        field(
                            "type",
                            choice(
                                prec(3, $.primitive_type),
                                prec(2, $.custom_type),
                            ),
                        ),
                    ),
                    field("name", prec(1, $.identifier)),
                    optional(field("dimensions", $.array_dimension)),
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

        define_call_section: ($) =>
            seq(keywords.define_call, $.call_definition),

        define_module_section: ($) =>
            prec.right(
                seq(keywords.define_module, repeat($.module_definition)),
            ),

        module_definition: ($) =>
            seq(
                field("module_name", $.string_literal),
                field("instance_name", $.identifier),
                field("parameters", $.argument_list),
                optional(";"),
            ),

        event_definition: ($) =>
            choice(
                $.button_event_definition,
                $.channel_event_definition,
                $.level_event_definition,
                $.data_event_definition,
                $.timeline_event_definition,
                $.custom_event_definition,
            ),

        data_event_definition: ($) =>
            seq(
                seq(
                    keywords.data_event,
                    field("device", $.data_event_device_reference),
                ),
                repeat(
                    seq(
                        keywords.data_event,
                        field("device", $.data_event_device_reference),
                    ),
                ),
                field("body", $.data_event_block),
            ),

        data_event_device_reference: ($) =>
            seq("[", choice($.device_literal, $.identifier, $.expression), "]"),

        data_event_block: ($) => seq("{", repeat1($.data_event_handler), "}"),

        data_event_handler: ($) =>
            seq(
                field("type", $.data_event_type),
                ":",
                field("body", $.compound_statement),
            ),

        data_event_type: (_) =>
            choice(
                keywords.command,
                keywords.string,
                keywords.online,
                keywords.offline,
                keywords.onerror,
                keywords.standby,
                keywords.awake,
            ),

        timeline_event_definition: ($) =>
            seq(
                seq(
                    keywords.timeline_event,
                    field("id", $.timeline_event_id_reference),
                ),
                repeat(
                    seq(
                        keywords.timeline_event,
                        field("id", $.timeline_event_id_reference),
                    ),
                ),
                field("body", $.compound_statement),
            ),

        timeline_event_id_reference: ($) => seq("[", $.expression, "]"),

        button_event_definition: ($) =>
            seq(
                seq(
                    keywords.button_event,
                    field("devchan", $.button_event_device_channel_reference),
                ),
                repeat(
                    seq(
                        keywords.button_event,
                        field(
                            "devchan",
                            $.button_event_device_channel_reference,
                        ),
                    ),
                ),
                field("body", $.button_event_block),
            ),

        button_event_device_channel_reference: ($) =>
            seq(
                "[",
                choice(
                    seq(
                        field(
                            "device",
                            choice(
                                $.device_literal,
                                $.identifier,
                                $.expression,
                            ),
                        ),
                        ",",
                        field("channel", choice($.identifier, $.expression)),
                    ),
                    field("devchan", choice($.identifier, $.expression)),
                ),
                "]",
            ),

        button_event_block: ($) =>
            seq("{", repeat1($.button_event_handler), "}"),

        button_event_handler: ($) =>
            seq(
                field("type", $.button_event_type),
                ":",
                field("body", $.compound_statement),
            ),

        button_event_type: ($) =>
            choice(
                keywords.push,
                keywords.release,
                choice(
                    // HOLD[time]
                    seq(
                        keywords.hold,
                        seq("[", field("time", $.expression), "]"),
                    ),

                    // HOLD[time,repeat]
                    seq(
                        keywords.hold,
                        seq(
                            "[",
                            field("time", $.expression),
                            ",",
                            field(
                                "repeat",
                                alias(
                                    token.immediate(/[Rr][Ee][Pp][Ee][Aa][Tt]/),
                                    "repeat",
                                ),
                            ),
                            "]",
                        ),
                    ),
                ),
            ),

        level_event_definition: ($) =>
            seq(
                seq(
                    keywords.level_event,
                    field("devlev", $.level_event_device_level_reference),
                ),
                repeat(
                    seq(
                        keywords.level_event,
                        field("devlev", $.level_event_device_level_reference),
                    ),
                ),
                field("body", $.compound_statement),
            ),

        level_event_device_level_reference: ($) =>
            seq(
                "[",
                choice(
                    seq(
                        field(
                            "device",
                            choice(
                                $.device_literal,
                                $.identifier,
                                $.expression,
                            ),
                        ),
                        ",",
                        field("level", choice($.identifier, $.expression)),
                    ),
                    field("devlev", choice($.identifier, $.expression)),
                ),
                "]",
            ),

        channel_event_definition: ($) =>
            seq(
                seq(
                    keywords.channel_event,
                    field("devchan", $.channel_event_device_channel_reference),
                ),
                repeat(
                    seq(
                        keywords.channel_event,
                        field(
                            "devchan",
                            $.channel_event_device_channel_reference,
                        ),
                    ),
                ),
                field("body", $.channel_event_block),
            ),

        channel_event_device_channel_reference: ($) =>
            seq(
                "[",
                choice(
                    seq(
                        field(
                            "device",
                            choice(
                                $.device_literal,
                                $.identifier,
                                $.expression,
                            ),
                        ),
                        ",",
                        field("channel", choice($.identifier, $.expression)),
                    ),
                    field("devchan", choice($.identifier, $.expression)),
                ),
                "]",
            ),

        channel_event_block: ($) =>
            seq("{", repeat1($.channel_event_handler), "}"),

        channel_event_handler: ($) =>
            seq(
                field("type", $.channel_event_type),
                ":",
                field("body", $.compound_statement),
            ),

        channel_event_type: (_) => choice(keywords.on, keywords.off),

        custom_event_definition: ($) =>
            seq(
                seq(
                    keywords.custom_event,
                    field("reference", $.custom_event_reference),
                ),
                repeat(
                    seq(
                        keywords.custom_event,
                        field("reference", $.custom_event_reference),
                    ),
                ),
                field("body", $.compound_statement),
            ),

        custom_event_reference: ($) =>
            seq(
                "[",
                choice(
                    // Format 1: [DEVICE,ID,TYPE]
                    seq(
                        field(
                            "device",
                            choice(
                                $.device_literal,
                                $.identifier,
                                $.expression,
                            ),
                        ),
                        ",",
                        field("id", $.expression),
                        ",",
                        field("type", $.expression),
                    ),

                    // Format 2: [DEVCHAN,EVENTID]
                    seq(
                        field("devchan", choice($.identifier, $.expression)),
                        ",",
                        field("eventid", $.expression),
                    ),
                ),
                "]",
            ),

        _abstract_declarator: ($) => choice($.abstract_array_declarator),

        array_dimension: ($) =>
            repeat1(
                choice(
                    seq("[", "]"),
                    seq("[", field("size", $.expression), "]"),
                ),
            ),

        _array_brackets: ($) =>
            seq("[", field("size", optional($.expression)), "]"),

        array_declarator: ($) =>
            prec(
                1,
                choice(
                    // Empty brackets case (variable-length arrays)
                    seq(field("declarator", $._declarator), "[", "]"),
                    // Standard case with optional size expression
                    seq(
                        field("declarator", $._declarator),
                        "[",
                        field("size", optional($.expression)),
                        "]",
                    ),
                ),
            ),

        array_field_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._field_declarator),
                    $._array_brackets,
                ),
            ),

        array_type_declarator: ($) =>
            prec(
                1,
                seq(field("declarator", $._type_declarator), $._array_brackets),
            ),

        abstract_array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", optional($._abstract_declarator)),
                    $._array_brackets,
                ),
            ),

        init_declarator: ($) =>
            seq(
                field("declarator", $._declarator),
                "=",
                field("value", choice($.initializer_list, $.expression)),
            ),

        compound_statement: ($) => seq("{", repeat($._block_item), "}"),
        // compound_statement: ($) =>
        //     seq(
        //         "{",
        //         repeat($.local_variable_declaration),
        //         repeat($.statement),
        //         "}",
        //     ),

        storage_class_specifier: (_) =>
            choice(keywords.local_var, keywords.stack_var),

        type_qualifier: ($) =>
            choice(
                keywords.constant,
                keywords.volatile,
                keywords.non_volatile,
                keywords.persistent,
            ),

        type_specifier: ($) => choice($.primitive_type, $.custom_type),

        custom_type: ($) => alias($.identifier, $.custom_type),

        struct_definition: ($) =>
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

        primitive_type: ($) => choice($.intrinsic_type, $.structured_type),

        intrinsic_type: (_) =>
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

        structured_type: (_) =>
            choice(keywords.dev, keywords.devlev, keywords.devchan),

        char_array_return_type: ($) =>
            seq(keywords.char, "[", field("size", $.expression), "]"),

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
                    field("return_type", $.char_array_return_type),
                    field("name", $.identifier),
                    field("parameters", $.parameter_list),
                    field("body", $.compound_statement),
                ),

                // Simple intrinsic return type
                seq(
                    field("return_type", $.intrinsic_type),
                    field("name", $.identifier),
                    field("parameters", $.parameter_list),
                    field("body", $.compound_statement),
                ),
            ),

        call_definition: ($) =>
            seq(
                field("name", $.string_literal),
                optional(field("parameters", $.parameter_list)),
                field("body", $.compound_statement),
            ),

        declaration: ($) =>
            prec.right(
                2,
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
                2,
                choice(
                    $.function_declarator,
                    $.array_declarator,
                    $.parenthesized_declarator,
                    $.identifier,
                ),
            ),

        _declaration_declarator: ($) =>
            prec(
                3,
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
                2,
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

        local_variable_declaration: ($) =>
            prec.right(
                10,
                seq(
                    optional(
                        field(
                            "storage",
                            choice(keywords.stack_var, keywords.local_var),
                        ),
                    ),
                    field("type", $.type_specifier),
                    commaSep1(
                        seq(
                            field("name", $.identifier),
                            optional(
                                field(
                                    "dimensions",
                                    repeat1(
                                        seq(
                                            "[",
                                            field("size", $.expression),
                                            "]",
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    optional(";"),
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
            prec(2, choice($._expression_not_binary, $.binary_expression)),

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
                $.device_channel_assignment_expression,
                $.device_channel_reference_expression,
                $.device_operation_expression,
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
                // $.device_channel_reference_expression,
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
                PREC.DEFAULT,
                seq(
                    field("left", $.expression),
                    ",",
                    field("right", choice($.expression, $.comma_expression)),
                ),
            ),

        argument_list: ($) =>
            seq("(", commaSep(choice($.expression, $.compound_statement)), ")"),

        field_expression: ($) =>
            seq(
                prec(
                    PREC.FIELD,
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
                choice($.expression, $.comma_expression, $.compound_statement),
                ")",
            ),

        device_operation_keyword: (_) =>
            choice(
                keywords.devchan_on,
                keywords.devchan_off,
                keywords.devchan_to,
                keywords.devchan_min_to,
                keywords.devchan_total_off,
                keywords.devchan_pulse,
            ),

        device_operation_expression: ($) =>
            prec.right(
                PREC.FIELD + 15,
                seq(
                    field("operation", $.device_operation_keyword),
                    field("target", $.device_channel_reference_expression),
                ),
            ),

        // When setting a channel: [device, channel] = value
        device_channel_assignment_expression: ($) =>
            prec.right(
                PREC.ASSIGNMENT,
                seq(
                    $.device_channel_reference_expression,
                    field("operator", "="),
                    field("value", $.expression),
                ),
            ),

        // When reading a channel: value = [device, channel]
        device_channel_reference_expression: ($) =>
            prec.dynamic(
                PREC.FIELD + 12,
                seq(
                    token("["),
                    field("device", $.expression),
                    ",",
                    field("channel", $.expression),
                    "]",
                ),
            ),

        // String Expressions in NetLinx are like an interpolated string
        string_expression: ($) => seq('"', commaSep1($.expression), '"'),

        initializer_list: ($) =>
            seq(
                "{",
                commaSep(choice($.expression, $.initializer_list)),
                optional(","),
                "}",
            ),

        string_literal: ($) =>
            seq(
                "'",
                alias(token.immediate(prec(1, /[^'\n]*/)), $.string_content),
                "'",
            ),

        literal: ($) => choice($.number_literal, $.string_literal),

        device_literal: ($) =>
            prec.right(
                PREC.FIELD + 10,
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

        true: (_) => netlinx.true,
        false: (_) => netlinx.false,

        identifier: (_) => /[_a-zA-Z][_a-zA-Z0-9]*/,

        _type_identifier: ($) =>
            prec.right(2, alias($.identifier, $.type_identifier)),

        _field_identifier: ($) => alias($.identifier, $.field_identifier),
        _statement_identifier: ($) =>
            alias($.identifier, $.statement_identifier),

        comment: (_) =>
            token(
                choice(
                    seq("//", /(\\+(.|\r?\n)|[^\\\n])*/), // Single-line comments
                    seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"), // C-style multi-line comments
                    seq("(*", /.*/, "*)"), // Pascal-style comments
                ),
            ),
    },
});

// /**
//  * Creates preprocessor conditional rules
//  *
//  * @param {string} suffix
//  * @param {RuleBuilder<string>} content
//  * @param {number} precedence
//  *
//  * @returns {RuleBuilders<string, string>}
//  */
// function preprocIf(suffix, content, precedence = PREC.DIRECTIVE) {
//     /**
//      *
//      * @param {GrammarSymbols<string>} $
//      *
//      * @returns {ChoiceRule}
//      */
//     function alternativeBlock($) {
//         return choice(
//             suffix
//                 ? alias($["preproc_else" + suffix], $.preproc_else)
//                 : $.preproc_else,
//         );
//     }

//     return {
//         ["preproc_if_defined" + suffix]: ($) =>
//             prec(
//                 precedence,
//                 seq(
//                     preprocessor(directives.if_defined),
//                     field("name", $.identifier),
//                     "\n",
//                     repeat(content($)),
//                     field("alternative", optional(alternativeBlock($))),
//                     $.preproc_end_if,
//                 ),
//             ),

//         ["preproc_if_not_defined" + suffix]: ($) =>
//             prec(
//                 precedence,
//                 seq(
//                     preprocessor(directives.if_not_defined),
//                     field("name", $.identifier),
//                     "\n",
//                     repeat(content($)),
//                     field("alternative", optional(alternativeBlock($))),
//                     $.preproc_end_if,
//                 ),
//             ),

//         ["preproc_else" + suffix]: ($) =>
//             prec(
//                 precedence,
//                 seq(preprocessor(directives.else), repeat(content($))),
//             ),

//         ["preproc_end_if"]: (_) => preprocessor(directives.end_if),
//     };
// }

/**
 * Creates preprocessor conditional rules
 *
 * @param {string} suffix
 * @param {number} precedence
 *
 * @returns {RuleBuilders<string, string>}
 */
function preprocIf(suffix, precedence = PREC.DIRECTIVE) {
    /**
     *
     * @param {GrammarSymbols<string>} $
     *
     * @returns {Rule}
     */
    function contentForContext($) {
        switch (suffix) {
            case "":
                return $._top_level_item;
            case "_in_section":
                return $._section_item;
            case "_in_block":
                return $._block_item;
            default:
                return $._top_level_item;
        }
    }

    return {
        ["preproc_if_defined" + suffix]: ($) =>
            prec(
                precedence,
                seq(
                    preprocessor(directives.if_defined),
                    field("name", $.identifier),
                    "\n",
                    repeat(contentForContext($)),
                    field("alternative", optional($.preproc_else)),
                    $.preproc_end_if,
                ),
            ),

        ["preproc_if_not_defined" + suffix]: ($) =>
            prec(
                precedence,
                seq(
                    preprocessor(directives.if_not_defined),
                    field("name", $.identifier),
                    "\n",
                    repeat(contentForContext($)),
                    field("alternative", optional($.preproc_else)),
                    $.preproc_end_if,
                ),
            ),

        ["preproc_else" + suffix]: ($) =>
            prec(
                precedence,
                seq(
                    preprocessor(directives.else),
                    repeat(contentForContext($)),
                ),
            ),

        ["preproc_end_if"]: (_) => preprocessor(directives.end_if),
    };
}

/**
 * Creates a preprocessor regex rule
 *
 * @param {RegExp | Rule | string} command
 *
 * @returns {AliasRule}
 */
function preprocessor(command) {
    if (command === directives.include) {
        // Allow for optional # at the start of include
        return alias(new RegExp("#?" + command, "i"), "#" + command);
    }

    return alias(new RegExp("#" + command, "i"), "#" + command);
}

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
