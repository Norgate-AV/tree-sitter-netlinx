/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const directives = require("./directives");
const keywords = require("./keyword-nodes");

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

    externals: ($) => [$._automatic_semicolon],

    conflicts: ($) => [
        [$.type_specifier, $.expression],
        [$.string_expression],
        [$.type_specifier, $._top_level_expression_statement],
        [$.device_literal],
        [$.initializer_list],
        [
            $.preproc_if_defined_in_initializer_list,
            $.preproc_if_defined_in_initializer_list_no_comma,
        ],
        [
            $.preproc_if_not_defined_in_initializer_list,
            $.preproc_if_not_defined_in_initializer_list_no_comma,
        ],
        [
            $.preproc_else_in_initializer_list,
            $.preproc_else_in_initializer_list_no_comma,
        ],
        [$.preproc_if_defined_in_button_event_declarator],
        [$.preproc_else_in_button_event_declarator],
        [$.preproc_if_defined_in_button_event_block],
        [$.preproc_else_in_button_event_block],
        [$.preproc_if_defined_in_data_event_declarator],
        [$.preproc_else_in_data_event_declarator],
        [$.preproc_if_defined_in_data_event_block],
        [$.preproc_else_in_data_event_block],
        [$.preproc_if_defined_in_channel_event_declarator],
        [$.preproc_else_in_channel_event_declarator],
        [$.preproc_if_defined_in_channel_event_block],
        [$.preproc_else_in_channel_event_block],
        [$.preproc_if_defined_in_timeline_event_declarator],
        [$.preproc_else_in_timeline_event_declarator],
        [$.preproc_if_defined_in_level_event_declarator],
        [$.preproc_else_in_level_event_declarator],
        [$.preproc_if_defined_in_custom_event_declarator],
        [$.preproc_else_in_custom_event_declarator],
    ],

    extras: ($) => [/\s/, $.comment],

    inline: ($) => [
        $._type_identifier,
        $._field_identifier,
        $._statement_identifier,
        $._non_case_statement,
        $._assignment_left_expression,
        $._expression_not_binary,
        $._semicolon,
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

                // Preprocessor
                $.preproc_if_defined,
                $.preproc_if_not_defined,
                $.preproc_define,
                $.preproc_include,
                $.preproc_warn,
                $.preproc_disable_warning,
            ),

        // Include all keyword nodes
        ...keywords,

        program_name: ($) =>
            prec.right(
                PREC.DIRECTIVE + 10,
                seq($.program_name_keyword, "=", $.string_literal),
            ),

        module_name: ($) =>
            prec.right(
                seq(
                    $.module_name_keyword,
                    "=",
                    $.string_literal,
                    optional(field("parameters", $.parameter_list)),
                ),
            ),

        // Preprocessor
        preproc_include: ($) =>
            seq(
                alias(
                    preprocessor(directives.include),
                    $.preproc_include_keyword,
                ),
                field("path", choice($.string_literal)),
                $._semicolon,
            ),

        preproc_define: ($) =>
            seq(
                alias(
                    preprocessor(directives.define),
                    $.preproc_define_keyword,
                ),
                field("name", $.identifier),
                field("value", optional($.preproc_arg)),
                $._semicolon,
            ),

        preproc_warn: ($) =>
            seq(
                alias(preprocessor(directives.warn), $.preproc_warn_keyword),
                field("message", $.string_literal),
                $._semicolon,
            ),

        preproc_disable_warning: ($) =>
            seq(
                alias(
                    preprocessor(directives.disable_warning),
                    $.preproc_disable_warning_keyword,
                ),
                field("code", $.number_literal),
                $._semicolon,
            ),

        ...preprocIf("", ($) => $._top_level_item),
        ...preprocIf("_in_block", ($) => $._block_item),
        ...preprocIf(
            "_in_field_declaration_list",
            ($) => $._field_declaration_list_item,
        ),

        ...preprocIf("_in_initializer_list", ($) =>
            choice(
                seq($.expression, ","),
                seq($.initializer_list, ","),
                seq(",", $.expression),
                seq(",", $.initializer_list),
            ),
        ),

        ...preprocIf(
            "_in_initializer_list_no_comma",
            ($) => choice($.expression, $.initializer_list),
            -1,
        ),

        ...preprocIf("_in_button_event_declarator", ($) =>
            repeat1($.button_event_declarator),
        ),

        ...preprocIf("_in_button_event_block", ($) =>
            repeat1($._button_event_block_item),
        ),

        ...preprocIf("_in_data_event_declarator", ($) =>
            repeat1($.data_event_declarator),
        ),

        ...preprocIf("_in_data_event_block", ($) =>
            repeat1($._data_event_block_item),
        ),

        ...preprocIf("_in_channel_event_declarator", ($) =>
            repeat1($.channel_event_declarator),
        ),

        ...preprocIf("_in_channel_event_block", ($) =>
            repeat1($._channel_event_block_item),
        ),

        ...preprocIf("_in_timeline_event_declarator", ($) =>
            repeat1($.timeline_event_declarator),
        ),

        ...preprocIf("_in_level_event_declarator", ($) =>
            repeat1($.level_event_declarator),
        ),

        ...preprocIf("_in_custom_event_declarator", ($) =>
            repeat1($.custom_event_declarator),
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
                $.define_system_variable_section,
                $.define_start_section,
                $.define_event_section,
                $.define_program_section,
            ),

        define_device_section: ($) => $.define_device_keyword,
        define_combine_section: ($) => $.define_combine_keyword,
        define_connect_level_section: ($) => $.define_connect_level_keyword,
        define_constant_section: ($) => $.define_constant_keyword,
        define_type_section: ($) => $.define_type_keyword,
        define_mutually_exclusive_section: ($) =>
            $.define_mutually_exclusive_keyword,
        define_latching_section: ($) => $.define_latching_keyword,
        define_toggling_section: ($) => $.define_toggling_keyword,
        define_variable_section: ($) => $.define_variable_keyword,
        define_system_variable_section: ($) => $.define_system_variable_keyword,
        define_event_section: ($) => $.define_event_keyword,
        define_start_section: ($) => $.define_start_keyword,
        define_program_section: ($) => $.define_program_keyword,

        define_function: ($) =>
            choice(
                seq($.define_function_keyword, $.function_definition),
                seq($.define_library_function_keyword, $.function_declaration),
            ),

        define_call: ($) => seq($.define_call_keyword, $.call_definition),
        define_module: ($) => seq($.define_module_keyword, $.module_definition),

        module_definition: ($) =>
            seq(
                field("module_name", $.string_literal),
                field("instance_name", $.identifier),
                field("parameters", $.argument_list),
                $._semicolon,
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
                $._data_event_declarator_list,
                field("body", $.data_event_block),
            ),

        _data_event_declarator_list: ($) =>
            seq(
                $.data_event_declarator,
                repeat(
                    choice(
                        $.data_event_declarator,
                        alias(
                            $.preproc_if_defined_in_data_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_data_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        data_event_declarator: ($) =>
            seq(
                $.data_event_keyword,
                field("device", $.data_event_device_reference),
            ),

        data_event_device_reference: ($) => seq("[", $.expression, "]"),

        data_event_block: ($) =>
            seq("{", repeat($._data_event_block_item), "}"),

        _data_event_block_item: ($) =>
            choice(
                $.data_event_handler,
                alias(
                    $.preproc_if_defined_in_data_event_block,
                    $.preproc_if_defined,
                ),
                alias(
                    $.preproc_if_not_defined_in_data_event_block,
                    $.preproc_if_not_defined,
                ),
                $.preproc_define,
                $.preproc_include,
                $.preproc_warn,
                $.preproc_disable_warning,
            ),

        data_event_handler: ($) =>
            seq(
                field("type", $.data_event_type),
                ":",
                field("body", $.compound_statement),
            ),

        data_event_type: ($) =>
            choice(
                $.command_keyword,
                $.string_keyword,
                $.online_keyword,
                $.offline_keyword,
                $.onerror_keyword,
                $.standby_keyword,
                $.awake_keyword,
            ),

        timeline_event_definition: ($) =>
            seq(
                $._timeline_event_declarator_list,
                field("body", $.compound_statement),
            ),

        _timeline_event_declarator_list: ($) =>
            seq(
                $.timeline_event_declarator,
                repeat(
                    choice(
                        $.timeline_event_declarator,
                        alias(
                            $.preproc_if_defined_in_timeline_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_timeline_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        timeline_event_declarator: ($) =>
            seq(
                $.timeline_event_keyword,
                field("id", $.timeline_event_id_reference),
            ),

        timeline_event_id_reference: ($) => seq("[", $.expression, "]"),

        button_event_definition: ($) =>
            seq(
                $._button_event_declarator_list,
                field("body", $.button_event_block),
            ),

        _button_event_declarator_list: ($) =>
            seq(
                $.button_event_declarator,
                repeat(
                    choice(
                        $.button_event_declarator,
                        alias(
                            $.preproc_if_defined_in_button_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_button_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        button_event_declarator: ($) =>
            seq(
                $.button_event_keyword,
                field("devchan", $.button_event_devchan_reference),
            ),

        button_event_devchan_reference: ($) =>
            choice($.devchan_expression, seq("[", $.expression, "]")),

        button_event_block: ($) =>
            seq("{", repeat($._button_event_block_item), "}"),

        _button_event_block_item: ($) =>
            choice(
                $.button_event_handler,
                alias(
                    $.preproc_if_defined_in_button_event_block,
                    $.preproc_if_defined,
                ),
                alias(
                    $.preproc_if_not_defined_in_button_event_block,
                    $.preproc_if_not_defined,
                ),
                $.preproc_define,
                $.preproc_include,
                $.preproc_warn,
                $.preproc_disable_warning,
            ),

        button_event_handler: ($) =>
            seq(
                field("type", $.button_event_type),
                ":",
                field("body", $.compound_statement),
            ),

        button_event_type: ($) =>
            choice(
                $.push_keyword,
                $.release_keyword,
                choice(
                    // HOLD[time[, repeat]]
                    seq(
                        $.hold_keyword,
                        seq(
                            "[",
                            field("time", $.expression),
                            optional(seq(",", $.button_event_hold_repeat)),
                            "]",
                        ),
                    ),
                ),
            ),

        button_event_hold_repeat: ($) => $.repeat_keyword,

        level_event_definition: ($) =>
            seq(
                $._level_event_declarator_list,
                field("body", $.compound_statement),
            ),

        _level_event_declarator_list: ($) =>
            seq(
                $.level_event_declarator,
                repeat(
                    choice(
                        $.level_event_declarator,
                        alias(
                            $.preproc_if_defined_in_level_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_level_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        level_event_declarator: ($) =>
            seq(
                $.level_event_keyword,
                field("devlev", $.level_event_devlev_reference),
            ),

        level_event_devlev_reference: ($) =>
            choice($.devlev_expression, seq("[", $.expression, "]")),

        channel_event_definition: ($) =>
            seq(
                $._channel_event_declarator_list,
                field("body", $.channel_event_block),
            ),

        _channel_event_declarator_list: ($) =>
            seq(
                $.channel_event_declarator,
                repeat(
                    choice(
                        $.channel_event_declarator,
                        alias(
                            $.preproc_if_defined_in_channel_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_channel_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        channel_event_declarator: ($) =>
            seq(
                $.channel_event_keyword,
                field("devchan", $.channel_event_devchan_reference),
            ),

        channel_event_devchan_reference: ($) =>
            choice($.devchan_expression, seq("[", $.expression, "]")),

        channel_event_block: ($) =>
            seq("{", repeat($._channel_event_block_item), "}"),

        _channel_event_block_item: ($) =>
            choice(
                $.channel_event_handler,
                alias(
                    $.preproc_if_defined_in_channel_event_block,
                    $.preproc_if_defined,
                ),
                alias(
                    $.preproc_if_not_defined_in_channel_event_block,
                    $.preproc_if_not_defined,
                ),
                $.preproc_define,
                $.preproc_include,
                $.preproc_warn,
                $.preproc_disable_warning,
            ),

        channel_event_handler: ($) =>
            seq(
                field("type", $.channel_event_type),
                ":",
                field("body", $.compound_statement),
            ),

        channel_event_type: ($) => choice($.on_keyword, $.off_keyword),

        custom_event_definition: ($) =>
            seq(
                $._custom_event_declarator_list,
                field("body", $.compound_statement),
            ),

        _custom_event_declarator_list: ($) =>
            seq(
                $.custom_event_declarator,
                repeat(
                    choice(
                        $.custom_event_declarator,
                        alias(
                            $.preproc_if_defined_in_custom_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_custom_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        custom_event_declarator: ($) =>
            seq(
                $.custom_event_keyword,
                field("reference", $.custom_event_reference),
            ),

        custom_event_reference: ($) =>
            seq(
                "[",
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

        storage_class_specifier: ($) =>
            choice($.local_var_keyword, $.stack_var_keyword),

        type_qualifier: ($) =>
            choice(
                $.constant_keyword,
                $.volatile_keyword,
                $.non_volatile_keyword,
                $.persistent_keyword,
            ),

        type_specifier: ($) => choice($.intrinsic_type, $._type_identifier),

        struct_specifier: ($) =>
            prec.right(
                seq(
                    choice($.struct_keyword, $.structure_keyword),
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
                    $._semicolon,
                ),
            ),

        _field_declaration_declarator: ($) =>
            commaSep1(seq(field("declarator", $._field_declarator))),

        intrinsic_type: ($) => choice($.primitive_type, $.structured_type),

        primitive_type: ($) =>
            choice(
                $.char_keyword,
                $.widechar_keyword,
                $.integer_keyword,
                $.sinteger_keyword,
                $.long_keyword,
                $.slong_keyword,
                $.float_keyword,
                $.double_keyword,
                $.variant_keyword,
                $.variantarray_keyword,
            ),

        structured_type: ($) =>
            choice($.dev_keyword, $.devlev_keyword, $.devchan_keyword),

        array_return_type: ($) =>
            seq(
                $.type_specifier,
                "[",
                optional(field("size", $.expression)),
                "]",
            ),

        function_definition: ($) =>
            seq(
                optional(
                    field(
                        "return_type",
                        choice($.type_specifier, $.array_return_type),
                    ),
                ),
                field("name", $.identifier),
                field("parameters", $.parameter_list),

                // Optional local declarations
                // Legacy/Weird syntax where local declarations
                // are defined before the body of the function
                field("local_declarations", repeat($.declaration)),

                // Function body { ... }
                field("body", $.compound_statement),
            ),

        function_declaration: ($) =>
            seq(
                optional(
                    field(
                        "return_type",
                        choice($.type_specifier, $.array_return_type),
                    ),
                ),
                field("name", $.identifier),
                field("parameters", $.parameter_list),
                optional(seq("=", $.expression)),
                $._semicolon,
            ),

        call_definition: ($) =>
            seq(
                field("name", $.string_literal),
                optional(field("parameters", $.parameter_list)),

                // Optional local declarations
                // Legacy/Weird syntax where local declarations
                // are defined before the body of the function
                field("local_declarations", repeat($.declaration)),

                // Call body { ... }
                field("body", $.compound_statement),
            ),

        declaration: ($) =>
            prec.right(
                seq(
                    choice(
                        // Regular declaration with custom type
                        prec.right(
                            10,
                            seq(
                                $._declaration_specifiers,
                                alias($.identifier, $.type_identifier),
                                commaSep1(
                                    field(
                                        "declarator",
                                        choice(
                                            seq($._declaration_declarator),
                                            $.init_declarator,
                                        ),
                                    ),
                                ),
                            ),
                        ),

                        // Custom type with qualifier only
                        prec.right(
                            10,
                            seq(
                                $.type_qualifier,
                                alias($.identifier, $.type_identifier),
                                commaSep1(
                                    field(
                                        "declarator",
                                        choice(
                                            seq($._declaration_declarator),
                                            $.init_declarator,
                                        ),
                                    ),
                                ),
                            ),
                        ),

                        // Custom type with storage class only
                        prec.right(
                            10,
                            seq(
                                $.storage_class_specifier,
                                alias($.identifier, $.type_identifier),
                                commaSep1(
                                    field(
                                        "declarator",
                                        choice(
                                            seq($._declaration_declarator),
                                            $.init_declarator,
                                        ),
                                    ),
                                ),
                            ),
                        ),

                        // Regular declaration
                        prec.right(
                            1,
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
                            ),
                        ),

                        // Qualifier only
                        prec.right(
                            2,
                            seq(
                                $.type_qualifier,
                                commaSep1(
                                    field(
                                        "declarator",
                                        choice(
                                            seq($._declaration_declarator),
                                            $.init_declarator,
                                        ),
                                    ),
                                ),
                            ),
                        ),

                        // Storage class only
                        prec.right(
                            3,
                            seq(
                                $.storage_class_specifier,
                                commaSep1(
                                    field(
                                        "declarator",
                                        choice(
                                            seq($._declaration_declarator),
                                            $.init_declarator,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    $._semicolon,
                ),
            ),

        type_definition: ($) =>
            prec.right(seq($.struct_specifier, $._semicolon)),

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
                $.active_statement,
                $.while_statement,
                $.for_statement,
                $.return_statement,
                $.break_statement,
                $.continue_statement,
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
                $.call_statement,
                $.system_call_statement,
            ),

        _top_level_statement: ($) =>
            choice(
                $.case_statement,
                $.compound_statement,
                $.expression_statement,
                $.if_statement,
                $.switch_statement,
                $.select_statement,
                $.active_statement,
                $.while_statement,
                $.for_statement,
                $.return_statement,
                $.break_statement,
                $.continue_statement,
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
                $.call_statement,
                $.system_call_statement,
            ),

        _top_level_expression_statement: ($) =>
            seq($._expression_not_binary, $._semicolon),

        expression_statement: ($) =>
            choice(seq(choice($.expression, $.comma_expression), $._semicolon)),

        if_statement: ($) =>
            prec.right(
                seq(
                    $.if_keyword,
                    field("condition", $.parenthesized_expression),
                    field("consequence", $.statement),
                    optional(field("alternative", $.else_clause)),
                ),
            ),

        else_clause: ($) => seq($.else_keyword, $.statement),

        switch_statement: ($) =>
            seq(
                $.switch_keyword,
                field("condition", $.parenthesized_expression),
                field("body", $.compound_statement),
            ),

        case_statement: ($) =>
            prec.right(
                seq(
                    choice(
                        seq($.case_keyword, field("value", $.expression)),
                        $.default_keyword,
                    ),
                    ":",
                    repeat(choice($._non_case_statement, $.declaration)),
                ),
            ),

        while_statement: ($) =>
            seq(
                $.while_keyword,
                field("condition", $.parenthesized_expression),
                field("body", $.statement),
            ),

        for_statement: ($) =>
            seq(
                $.for_keyword,
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
            seq($.select_keyword, field("body", $.compound_statement)),

        active_statement: ($) =>
            seq(
                $.active_keyword,
                field("condition", $.parenthesized_expression),
                ":",
                field("body", $.statement),
            ),

        return_statement: ($) =>
            seq(
                $.return_keyword,
                optional(
                    choice(
                        $.expression,
                        $.comma_expression,
                        $.initializer_list,
                    ),
                ),
                $._semicolon,
            ),

        break_statement: ($) => seq($.break_keyword, $._semicolon),

        continue_statement: ($) => seq($.continue_keyword, $._semicolon),

        devchan_operation_statement: ($) =>
            prec.right(
                PREC.FIELD + 20,
                seq(
                    field("operation", $.devchan_operation),
                    field(
                        "target",
                        choice(
                            $.devchan_expression,
                            $.devchan_range_expression,
                        ),
                    ),
                    $._semicolon,
                ),
            ),

        devchan_operation: ($) =>
            choice(
                $.devchan_on_keyword,
                $.devchan_off_keyword,
                $.devchan_to_keyword,
                $.devchan_min_to_keyword,
                $.devchan_total_off_keyword,
                $.devchan_pulse_keyword,
            ),

        send_string_statement: ($) =>
            seq(
                $.send_string_keyword,
                field("device", $.expression),
                ",",
                field("value", $.expression),
                $._semicolon,
            ),

        send_command_statement: ($) =>
            seq(
                $.send_command_keyword,
                field("device", $.expression),
                ",",
                field("value", $.expression),
                $._semicolon,
            ),

        send_level_statement: ($) =>
            seq(
                $.send_level_keyword,
                field("device", $.expression),
                ",",
                field("level", $.expression),
                ",",
                field("value", $.expression),
                $._semicolon,
            ),

        create_buffer_statement: ($) =>
            seq($.create_buffer_keyword, $.comma_expression, $._semicolon),

        create_multi_buffer_statement: ($) =>
            seq(
                $.create_multi_buffer_keyword,
                $.comma_expression,
                $._semicolon,
            ),

        clear_buffer_statement: ($) =>
            seq($.clear_buffer_keyword, $.expression, $._semicolon),

        wait_statement: ($) =>
            prec.right(
                seq(
                    $.wait_keyword,
                    field("time", $.expression),
                    optional(field("name", $.string_literal)),
                    optional($._semicolon),
                ),
            ),

        wait_until_statement: ($) =>
            prec.right(
                seq(
                    $.wait_until_keyword,
                    field("condition", $.expression),
                    optional(field("name", $.string_literal)),
                    optional($._semicolon),
                ),
            ),

        cancel_all_wait_statement: ($) =>
            seq($.cancel_all_wait_keyword, $._semicolon),
        cancel_all_wait_until_statement: ($) =>
            seq($.cancel_all_wait_until_keyword, $._semicolon),

        cancel_wait_statement: ($) =>
            seq(
                $.cancel_wait_keyword,
                field("name", $.string_literal),
                $._semicolon,
            ),

        cancel_wait_until_statement: ($) =>
            seq(
                $.cancel_wait_until_keyword,
                field("name", $.string_literal),
                $._semicolon,
            ),

        // This is for invoking NetLinx's legacy DEFINE_CALL function.
        // These cannot be used in or as expressions.
        // Think of them like simple macros.
        // They do not support return values.
        call_statement: ($) =>
            seq(
                $.call_keyword,
                field("call", $.string_literal),
                optional(field("arguments", $.argument_list)),
                $._semicolon,
            ),

        system_call_statement: ($) =>
            seq(
                $.system_call_keyword,
                field("call", $.string_literal),
                optional(field("arguments", $.argument_list)),
                $._semicolon,
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
                $.compiler_variable,
                $.device_literal,
                $.parenthesized_expression,
                $.devchan_range_expression,
                $.devchan_expression,
            ),

        compiler_variable: ($) =>
            choice(
                $.__file__,
                $.__date__,
                $.__ldate__,
                $.__time__,
                $.__line__,
                $.__name__,
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
                    field("operator", choice("!", "~", "-", "+", $.bnot)),
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
                ["<>", PREC.EQUAL],
                [">", PREC.RELATIONAL],
                [">=", PREC.RELATIONAL],
                ["<=", PREC.RELATIONAL],
                ["<", PREC.RELATIONAL],
                ["<<", PREC.SHIFT],
                [">>", PREC.SHIFT],
                [$.band, PREC.BITWISE_AND],
                [$.bor, PREC.INCLUSIVE_OR],
                [$.bxor, PREC.EXCLUSIVE_OR],
                [$.lshift, PREC.SHIFT],
                [$.rshift, PREC.SHIFT],
            ];

            return choice(
                ...table.map(([operator, precedence]) => {
                    return prec.left(
                        // @ts-ignore
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
                repeat(
                    choice(
                        seq(choice($.expression, $.initializer_list), ","),
                        alias(
                            $.preproc_if_defined_in_initializer_list,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_initializer_list,
                            $.preproc_if_not_defined,
                        ),
                        seq(
                            choice($.expression, $.initializer_list),
                            optional(","),
                        ),
                    ),
                ),
                optional(
                    choice(
                        $.expression,
                        $.initializer_list,
                        alias(
                            $.preproc_if_defined_in_initializer_list_no_comma,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_initializer_list_no_comma,
                            $.preproc_if_not_defined,
                        ),
                    ),
                ),
                "}",
            ),

        literal: ($) =>
            choice($.number_literal, $.string_literal, $.device_literal),

        device_literal: ($) =>
            prec.dynamic(
                PREC.FIELD + 30,
                seq(
                    field("device", $.expression),
                    ":",
                    field("port", $.expression),
                    ":",
                    field("system", $.expression),
                ),
            ),

        string_literal: ($) =>
            seq(
                "'",
                repeat(
                    choice(
                        alias(
                            token.immediate(prec(1, /[^'\n]+/)),
                            $.string_content,
                        ),
                        $.escape_sequence,
                    ),
                ),
                "'",
            ),

        escape_sequence: (_) => token(prec(1, seq("'", /'/))),

        number_literal: (_) => {
            return token(
                choice(
                    // Hexadecimal literals
                    /\$[0-9a-fA-F]+/,

                    // Floating point with scientific notation
                    seq(
                        optional(/[-+]/),
                        choice(
                            // Format: digits.digits
                            seq(/\d+/, ".", optional(/\d+/)),
                            // Format: .digits
                            seq(".", /\d+/),
                            // Format: digits (integers)
                            /\d+/,
                        ),
                        // Optional scientific notation
                        optional(seq(/[eE]/, optional(/[-+]/), /\d+/)),
                    ),
                ),
            );
        },

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

                    // Adding choice for Pascal-style comment endings
                    // This is to support this odd use case in the NetLinx.axi file
                    seq("(*", /[^*]*\*+(?:[^)*/][^*]*\*+)*/, choice(")", "/")), // Pascal-style comments
                ),
            ),

        _semicolon: ($) => choice($._automatic_semicolon, ";"),
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
            prec.dynamic(
                precedence,
                seq(
                    alias(
                        preprocessor(directives.if_defined),
                        $.preproc_if_defined_keyword,
                    ),
                    field("name", $.identifier),
                    optional("\n"),
                    repeat(content($)),
                    field("alternative", optional(alternativeBlock($))),
                    alias(
                        preprocessor(directives.end_if),
                        $.preproc_end_if_keyword,
                    ),
                ),
            ),

        ["preproc_if_not_defined" + suffix]: ($) =>
            prec.dynamic(
                precedence,
                seq(
                    alias(
                        preprocessor(directives.if_not_defined),
                        $.preproc_if_not_defined_keyword,
                    ),
                    field("name", $.identifier),
                    optional("\n"),
                    repeat(content($)),
                    field("alternative", optional(alternativeBlock($))),
                    alias(
                        preprocessor(directives.end_if),
                        $.preproc_end_if_keyword,
                    ),
                ),
            ),

        ["preproc_else" + suffix]: ($) =>
            prec.dynamic(
                precedence,
                seq(
                    alias(
                        preprocessor(directives.else),
                        $.preproc_else_keyword,
                    ),
                    repeat(content($)),
                ),
            ),
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
