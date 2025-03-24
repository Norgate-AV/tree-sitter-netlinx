/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const keywords = require("./keywords");
const netlinx = require("./netlinx");
const directives = require("./directives");

const PREC = {
    PAREN_DECLARATOR: -10,
    ASSIGNMENT: -2,
    CONDITIONAL: -1,
    DEFAULT: 0,
    LOGICAL_OR: 1,
    LOGICAL_AND: 2,
    INCLUSIVE_OR: 3,
    EXCLUSIVE_OR: 4,
    BITWISE_AND: 5,
    EQUAL: 6,
    RELATIONAL: 7,
    OFFSETOF: 8,
    SHIFT: 9,
    ADD: 10,
    MULTIPLY: 11,
    CAST: 12,
    UNARY: 14,
    CALL: 15,
    FIELD: 16,
    SUBSCRIPT: 17,
    DIRECTIVE: 20,
    SECTION_DEFINITION: 110,
};

module.exports = grammar({
    name: "netlinx",

    conflicts: ($) => [
        [$.type_specifier, $.expression],
        [$._declarator, $._declaration_declarator],
        [$.function_declarator, $._function_declaration_declarator],
        [$.string_expression],
        [$.type_specifier, $._top_level_expression_statement],
        [$.wait_statement],
        [$.wait_until_statement],
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
        source_file: ($) => repeat($._top_level_item),

        _top_level_item: ($) =>
            choice(
                // Sections
                $.section,

                // Headers
                $.program_name,
                $.module_name,

                // Functions, Calls, and Modules Definitions
                $.define_function,
                $.define_call,
                $.define_module,

                // Top-Level Declarations
                $.declaration,
                $.type_definition,
                $.event_definition,

                // Statements
                $._top_level_statement,

                // Preprocessor
                $.preproc_if_defined,
                $.preproc_if_not_defined,
                $.preproc_define,
                $.preproc_include,
                $.preproc_warn,
                $.preproc_disable_warning,
            ),

        _block_item: ($) =>
            choice(
                // Definitions
                $.define_function,
                $.type_definition,
                $.define_call,
                $.define_module,

                // Block-level declarations
                $.declaration,

                // Statements
                $.statement,
                // $.expression_statement,
                // $.compound_statement,

                // Sections
                // $.section,

                // Preprocessor
                $.preproc_if_defined,
                $.preproc_if_not_defined,
                $.preproc_define,
                $.preproc_include,
                $.preproc_warn,
                $.preproc_disable_warning,
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
        preproc_include: ($) =>
            seq(
                preprocessor(directives.include),
                field("path", choice($.string_literal)),
                token.immediate(/\r?\n/),
            ),

        preproc_define: ($) =>
            seq(
                preprocessor(directives.define),
                field("name", $.identifier),
                field("value", optional($.preproc_arg)),
                token.immediate(/\r?\n/),
            ),

        preproc_warn: ($) =>
            seq(
                preprocessor(directives.warn),
                field("message", $.string_literal),
                token.immediate(/\r?\n/),
            ),

        preproc_disable_warning: ($) =>
            seq(
                preprocessor(directives.disable_warning),
                field("code", $.decimal_literal),
                token.immediate(/\r?\n/),
            ),

        ...preprocIf("", ($) => $._top_level_item),
        ...preprocIf("_in_block", ($) => $._block_item),
        ...preprocIf(
            "_in_field_declaration_list",
            ($) => $._field_declaration_list_item,
        ),

        preproc_arg: (_) => token(prec(-1, /\S([^/\n]|\/[^*]|\\\r?\n)*/)),
        preproc_directive: (_) => /#[a-zA-Z0-9]\w*/,

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

        module_definition: ($) =>
            prec.right(
                seq(
                    field("module_name", $.string_literal),
                    field("instance_name", $.identifier),
                    field("parameters", $.argument_list),
                    optional(";"),
                ),
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
                repeat1($.data_event_declarator),
                field("body", $.data_event_block),
            ),

        data_event_declarator: ($) =>
            seq(
                keywords.data_event,
                field("device", $.data_event_device_reference),
            ),

        data_event_device_reference: ($) => seq("[", $.expression, "]"),

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
                repeat1($.timeline_event_declarator),
                field("body", $.compound_statement),
            ),

        timeline_event_declarator: ($) =>
            seq(
                keywords.timeline_event,
                field("id", $.timeline_event_id_reference),
            ),

        timeline_event_id_reference: ($) => seq("[", $.expression, "]"),

        button_event_definition: ($) =>
            seq(
                repeat1($.button_event_declarator),
                field("body", $.button_event_block),
            ),

        button_event_declarator: ($) =>
            seq(
                keywords.button_event,
                field("devchan", $.button_event_devchan_reference),
            ),

        button_event_devchan_reference: ($) =>
            choice($.devchan_expression, seq("[", $.expression, "]")),

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
                    // HOLD[time[, repeat]]
                    seq(
                        keywords.hold,
                        seq(
                            "[",
                            field("time", $.expression),
                            optional(seq(",", $.button_event_hold_repeat)),
                            "]",
                        ),
                    ),
                ),
            ),

        button_event_hold_repeat: (_) => keywords.repeat,

        level_event_definition: ($) =>
            seq(
                repeat1($.level_event_declarator),
                field("body", $.compound_statement),
            ),

        level_event_declarator: ($) =>
            seq(
                keywords.level_event,
                field("devlev", $.level_event_devlev_reference),
            ),

        level_event_devlev_reference: ($) =>
            choice($.devlev_expression, seq("[", $.expression, "]")),

        channel_event_definition: ($) =>
            seq(
                repeat1($.channel_event_declarator),
                field("body", $.channel_event_block),
            ),

        channel_event_declarator: ($) =>
            seq(
                keywords.channel_event,
                field("devchan", $.channel_event_devchan_reference),
            ),

        channel_event_devchan_reference: ($) =>
            choice($.devchan_expression, seq("[", $.expression, "]")),

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
                repeat1($.custom_event_declarator),
                field("body", $.compound_statement),
            ),

        custom_event_declarator: ($) =>
            seq(
                keywords.custom_event,
                field("reference", $.custom_event_reference),
            ),

        custom_event_reference: ($) =>
            seq(
                "[",
                // repeat1($.comma_expression),
                choice(
                    // Format 1: [DEVICE,ID,TYPE]
                    seq(
                        field("device", $.expression),
                        ",",
                        field("id", $.expression),
                        ",",
                        field("type", $.expression),
                    ),

                    // Format 2: [DEVCHAN,EVENTID]
                    seq(
                        field("devchan", $.expression),
                        ",",
                        field("eventid", $.expression),
                    ),
                ),
                "]",
            ),

        array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._declarator),
                    "[",
                    field("size", optional(choice($.expression))),
                    "]",
                ),
            ),

        array_field_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._field_declarator),
                    "[",
                    field("size", optional(choice($.expression))),
                    "]",
                ),
            ),

        array_type_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._type_declarator),
                    "[",
                    field("size", optional(choice($.expression))),
                    "]",
                ),
            ),

        abstract_array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", optional($._abstract_declarator)),
                    "[",
                    field("size", optional(choice($.expression))),
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

        type_specifier: ($) => choice($.intrinsic_type, $._type_identifier),

        struct_specifier: ($) =>
            prec.right(
                seq(
                    choice(keywords.struct, keywords.structure),
                    choice(
                        seq(
                            field("name", $._type_identifier),
                            field("body", $.field_declaration_list),
                        ),
                    ),
                ),
            ),

        field_declaration_list: ($) =>
            seq("{", repeat1($._field_declaration_list_item), "}"),

        _field_declaration_list_item: ($) =>
            choice(
                $.field_declaration,
                $.preproc_define,
                $.preproc_warn,
                $.preproc_disable_warning,
                alias(
                    $.preproc_if_defined_in_field_declaration_list,
                    $.preproc_if_defined,
                ),
                alias(
                    $.preproc_if_not_defined_in_field_declaration_list,
                    $.preproc_if_not_defined,
                ),
            ),

        field_declaration: ($) =>
            prec.right(
                seq(
                    $._declaration_specifiers,

                    // This may not need to be optional. But leaving it for now
                    // as it provides some flexibility
                    optional($._field_declaration_declarator),
                    optional(";"),
                ),
            ),

        _field_declaration_declarator: ($) =>
            commaSep1(seq(field("declarator", $._field_declarator))),

        intrinsic_type: ($) => choice($.primitive_type, $.structured_type),

        primitive_type: (_) =>
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

        array_return_type: ($) =>
            seq(
                $.type_specifier,
                "[",
                optional(field("size", $.expression)),
                "]",
            ),

        function_definition: ($) =>
            choice(
                seq(
                    optional(
                        field(
                            "return_type",
                            choice($.type_specifier, $.array_return_type),
                        ),
                    ),
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
            // Using prec.right here to allow for the optional semicolon
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

                    // NOTE: This optional semicolon is causing a "recoverable" error
                    // This is normal behavior for generalized LR parsing, which
                    // explores multiple paths and sometimes abandons some.
                    // The "recoverable error" only appears in debug output; it
                    // doesn't affect actual parsing.
                    // Despite the warning, the resulting AST is correct. Tree-sitter
                    // successfully produces the right tree structure.
                    optional(";"),
                ),
            ),

        type_definition: ($) =>
            prec.right(seq($.struct_specifier, optional(";"))),

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
                $.intrinsic_type,
            ),

        _abstract_declarator: ($) => choice($.abstract_array_declarator),

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
                1,
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

        /**
         * Statements
         */

        statement: ($) => choice($.case_statement, $._non_case_statement),

        _non_case_statement: ($) =>
            choice(
                $.compound_statement,
                $.expression_statement,
                $.if_statement,
                $.switch_statement,
                $.select_statement,
                $.while_statement,
                $.for_statement,
                $.return_statement,
                $.break_statement,
                $.continue_statement,
                // $.devchan_statement,
                $.devchan_operation_statement,
                $.send_string_statement,
                $.send_command_statement,
                $.send_level_statement,
                $.create_buffer_statement,
                $.create_multi_buffer_statement,
                $.clear_buffer_statement,
                $.wait_statement,
                $.wait_until_statement,
                $.cancel_all_wait_statement,
                $.cancel_all_wait_until_statement,
                $.cancel_wait_statement,
                $.cancel_wait_until_statement,
            ),

        _top_level_statement: ($) =>
            choice(
                $.case_statement,
                $.compound_statement,
                // alias(
                //     $._top_level_expression_statement,
                //     $.expression_statement,
                // ),
                $.expression_statement,
                $.if_statement,
                $.switch_statement,
                $.select_statement,
                $.while_statement,
                $.for_statement,
                $.return_statement,
                $.break_statement,
                $.continue_statement,
                // $.devchan_statement,
                $.devchan_operation_statement,
                $.send_string_statement,
                $.send_command_statement,
                $.send_level_statement,
                $.create_buffer_statement,
                $.create_multi_buffer_statement,
                $.clear_buffer_statement,
                $.wait_statement,
                $.wait_until_statement,
                $.cancel_all_wait_statement,
                $.cancel_all_wait_until_statement,
                $.cancel_wait_statement,
                $.cancel_wait_until_statement,
            ),

        _top_level_expression_statement: ($) =>
            seq($._expression_not_binary, optional(";")),

        expression_statement: ($) =>
            // Using prec.right here to allow for the optional semicolon
            prec.right(
                choice(
                    seq(
                        choice($.expression, $.comma_expression),
                        optional(choice(";", /\s*\r?\n/)),
                    ),
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
            // Using prec.right here to allow for the optional semicolon
            prec.right(
                seq(
                    keywords.return,
                    optional(choice($.expression, $.comma_expression)),
                    optional(";"),
                ),
            ),

        break_statement: (_) =>
            // Using prec.right here to allow for the optional semicolon
            prec.right(seq(keywords.break, optional(";"))),

        continue_statement: (_) =>
            // Using prec.right here to allow for the optional semicolon
            prec.right(seq(keywords.continue, optional(";"))),

        devchan_operation_statement: ($) =>
            prec.right(
                PREC.FIELD + 20,
                seq(
                    field("operation", $.devchan_operation),
                    field("target", $.devchan_expression),
                    optional(";"),
                ),
            ),

        devchan_operation: (_) =>
            choice(
                keywords.devchan_on,
                keywords.devchan_off,
                keywords.devchan_to,
                keywords.devchan_min_to,
                keywords.devchan_total_off,
                keywords.devchan_pulse,
            ),

        send_string_statement: ($) =>
            seq(
                keywords.send_string,
                field("device", $.expression),
                ",",
                field("value", $.expression),
                optional(";"),
            ),

        send_command_statement: ($) =>
            seq(
                keywords.send_command,
                field("device", $.expression),
                ",",
                field("value", $.expression),
                optional(";"),
            ),

        send_level_statement: ($) =>
            seq(
                keywords.send_level,
                field("device", $.expression),
                ",",
                field("level", $.expression),
                ",",
                field("value", $.expression),
                optional(";"),
            ),

        create_buffer_statement: ($) =>
            seq(keywords.create_buffer, $.comma_expression, optional(";")),

        create_multi_buffer_statement: ($) =>
            seq(
                keywords.create_multi_buffer,
                $.comma_expression,
                optional(";"),
            ),

        clear_buffer_statement: ($) =>
            seq(keywords.clear_buffer, $.expression, optional(";")),

        wait_statement: ($) =>
            seq(
                keywords.wait,
                field("time", $.expression),
                optional(field("name", $.string_literal)),
            ),

        wait_until_statement: ($) =>
            seq(
                keywords.wait_until,
                field("condition", $.expression),
                optional(field("name", $.string_literal)),
            ),

        cancel_all_wait_statement: (_) => keywords.cancel_all_wait,
        cancel_all_wait_until_statement: (_) => keywords.cancel_all_wait_until,

        cancel_wait_statement: ($) =>
            seq(
                keywords.cancel_wait,
                field("name", $.string_literal),
                optional(";"),
            ),

        cancel_wait_until_statement: ($) =>
            seq(
                keywords.cancel_wait_until,
                field("name", $.string_literal),
                optional(";"),
            ),

        // This is for invoking NetLinx's legacy DEFINE_CALL function.
        // These cannot be used in or as expressions.
        // Think of them like simple macros.
        // They do not support return values.
        call_statement: ($) =>
            seq(
                keywords.call,
                field("call", $.string_literal),
                field("arguments", $.argument_list),
                optional(";"),
            ),

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
                $.subscript_expression,
                $.string_expression,
                $.identifier,
                $.number_literal,
                $.string_literal,
                $.true,
                $.false,
                $.device_literal,
                $.parenthesized_expression,
                $.devchan_range_expression,
                $.devchan_expression,
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
                $.devchan_expression,
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

        devlev_expression: ($) =>
            prec.dynamic(
                PREC.FIELD + 12,
                seq(
                    token("["),
                    field("device", $.expression),
                    ",",
                    field("level", $.expression),
                    "]",
                ),
            ),

        devchan_expression: ($) =>
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

        devchan_range_expression: ($) =>
            prec.dynamic(
                PREC.FIELD,
                seq(
                    field("start", $.devchan_expression),
                    $.range_operator,
                    field("end", $.devchan_expression),
                ),
            ),

        range_operator: (_) => token(".."),

        // String Expressions in NetLinx are like interpolated strings
        // or string template literals in other languages.
        string_expression: ($) => seq('"', commaSep($.expression), '"'),

        initializer_list: ($) =>
            seq(
                "{",
                commaSep(choice($.expression, $.initializer_list)),
                optional(","),
                "}",
            ),

        literal: ($) =>
            choice($.number_literal, $.string_literal, $.device_literal),

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

        string_literal: ($) =>
            seq(
                "'",
                alias(token.immediate(prec(1, /[^'\n]*/)), $.string_content),
                "'",
            ),

        number_literal: ($) => choice($.decimal_literal, $.hex_literal),

        decimal_literal: (_) => /[-+]?\d+/,

        hex_literal: (_) => /\$[0-9a-fA-F]+/,

        true: (_) => netlinx.true,
        false: (_) => netlinx.false,

        identifier: (_) => /[_a-zA-Z][_a-zA-Z0-9]*/,

        _type_identifier: ($) => alias($.identifier, $.type_identifier),
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

/**
 * Creates preprocessor conditional rules
 *
 * @param {string} suffix
 * @param {RuleBuilder<string>} content
 * @param {number} precedence
 *
 * @returns {RuleBuilders<string, string>}
 */
function preprocIf(suffix, content, precedence = PREC.DIRECTIVE) {
    /**
     *
     * @param {GrammarSymbols<string>} $
     *
     * @returns {ChoiceRule}
     */
    function alternativeBlock($) {
        return choice(
            suffix
                ? alias($["preproc_else" + suffix], $.preproc_else)
                : $.preproc_else,
        );
    }

    return {
        ["preproc_if_defined" + suffix]: ($) =>
            prec(
                precedence,
                seq(
                    preprocessor(directives.if_defined),
                    field("name", $.identifier),
                    "\n",
                    repeat(content($)),
                    field("alternative", optional(alternativeBlock($))),
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
                    repeat(content($)),
                    field("alternative", optional(alternativeBlock($))),
                    $.preproc_end_if,
                ),
            ),

        ["preproc_else" + suffix]: ($) =>
            prec(
                precedence,
                seq(preprocessor(directives.else), repeat(content($))),
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
module.exports.preprocIf = preprocIf;
module.exports.preprocessor = preprocessor;
module.exports.commaSep = commaSep;
module.exports.commaSep1 = commaSep1;
