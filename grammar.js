/**
 * @file NetLinx grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const directives = require("./directives");
const keywords = require("./keyword-nodes");
const netlinx = require("./netlinx-nodes");

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
        [$.preproc_if_defined_in_push_event_declarator],
        [$.preproc_else_in_push_event_declarator],
        [$.preproc_if_defined_in_release_event_declarator],
        [$.preproc_else_in_release_event_declarator],
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

        // Include all netlinx nodes
        ...netlinx.constants,
        ...netlinx.types,
        ...netlinx.variables,
        ...netlinx.functions,

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
                seq(
                    optional(","),
                    choice($.expression, $.initializer_list),
                    optional(","),
                ),
                ",",
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

        ...preprocIf("_in_push_event_declarator", ($) =>
            repeat1($.push_event_declarator),
        ),

        ...preprocIf("_in_release_event_declarator", ($) =>
            repeat1($.release_event_declarator),
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
                $.push_event_definition,
                $.release_event_definition,
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

        push_event_definition: ($) =>
            seq(
                $._push_event_declarator_list,
                field("body", $.compound_statement),
            ),

        _push_event_declarator_list: ($) =>
            seq(
                $.push_event_declarator,
                repeat(
                    choice(
                        $.push_event_declarator,
                        alias(
                            $.preproc_if_defined_in_push_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_push_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        push_event_declarator: ($) =>
            seq(
                $.push_keyword,
                field("devchan", $.push_event_devchan_reference),
            ),

        push_event_devchan_reference: ($) =>
            choice($.devchan_expression, seq("[", $.expression, "]")),

        release_event_definition: ($) =>
            seq(
                $._release_event_declarator_list,
                field("body", $.compound_statement),
            ),

        _release_event_declarator_list: ($) =>
            seq(
                $.release_event_declarator,
                repeat(
                    choice(
                        $.release_event_declarator,
                        alias(
                            $.preproc_if_defined_in_release_event_declarator,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_release_event_declarator,
                            $.preproc_if_not_defined,
                        ),
                        $.preproc_define,
                        $.preproc_include,
                    ),
                ),
            ),

        release_event_declarator: ($) =>
            seq(
                $.release_keyword,
                field("devchan", $.release_event_devchan_reference),
            ),

        release_event_devchan_reference: ($) =>
            choice($.devchan_expression, seq("[", $.expression, "]")),

        array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._declarator),
                    "[",
                    field("size", optional($.expression)),
                    "]",
                ),
            ),

        array_field_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._field_declarator),
                    "[",
                    field("size", optional($.expression)),
                    "]",
                ),
            ),

        array_type_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", $._type_declarator),
                    "[",
                    field("size", optional($.expression)),
                    "]",
                ),
            ),

        abstract_array_declarator: ($) =>
            prec(
                1,
                seq(
                    field("declarator", optional($._abstract_declarator)),
                    "[",
                    field("size", optional($.expression)),
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

        type_specifier: ($) =>
            choice($.intrinsic_type, $.system_type, $._type_identifier),

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
                                field(
                                    "type",
                                    alias($.identifier, $.type_identifier),
                                ),
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
                                field(
                                    "type",
                                    alias($.identifier, $.type_identifier),
                                ),
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
                                field(
                                    "type",
                                    alias($.identifier, $.type_identifier),
                                ),
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
                $.system_type,
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
                $.compiler_variable,
                $.system_constant,
                $.system_variable,
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

        system_variable: ($) =>
            choice(
                $.___reserved___,
                $.date,
                $.day,
                $.time,
                $.ldate,
                $.push_device,
                $.push_channel,
                $.push_devchan,
                $.release_device,
                $.release_channel,
                $.release_devchan,
                $.master_slot,
                $.get_pulse_time,
                $.get_timer,
                $.master_sn,
                $.system_number,
                $.dv_channel,

                // Automatic Event Context Variables
                $.button,
                $.data,
                $.level,
                $.timeline,
                $.channel,
                $.custom,
            ),

        system_constant: ($) =>
            choice(
                $.__netlinx__,
                $.netlinx_axi_version,
                $.url_flg_tcp,
                $.url_flg_accinfopresent,
                $.url_flg_temp,
                $.url_flg_stat_prgnetlinx,
                $.url_flg_stat_mask,
                $.url_flg_stat_lookup,
                $.url_flg_stat_connecting,
                $.url_flg_stat_waiting,
                $.url_flg_stat_connected,
                $.ip_addr_flg_dhcp,
                $.first_virtual_device,
                $.first_local_port,
                $.dynamic_virtual_device,
                $.timeline_once,
                $.timeline_repeat,
                $.timeline_absolute,
                $.timeline_relative,
                $.do_push_timed_infinite,
                $.source_type_no_address,
                $.source_type_neuron_id,
                $.source_type_ip_address,
                $.source_type_axlink,
                $.source_type_neuron_subnode_icsp,
                $.source_type_neuron_subnode_pl,
                $.source_type_ip_socket_address,
                $.source_type_rs232,
                $.source_type_internal,
                $.source_type_mac_address,
                $.source_type_ipv4_port,
                $.source_type_ipv4_port_mac_address,
                $.source_type_ipv4_port_mac_ipv6,
                $.internal_queue_size_index_interpreter,
                $.internal_queue_size_index_notification_mgr,
                $.internal_queue_size_index_connection_mgr,
                $.internal_queue_size_index_route_mgr,
                $.internal_queue_size_index_device_mgr,
                $.internal_queue_size_index_diagnostic_mgr,
                $.internal_queue_size_index_tcp_tx,
                $.internal_queue_size_index_ipconnection_mgr,
                $.internal_queue_size_index_message_dispatcher,
                $.internal_queue_size_index_axlink_tx,
                $.internal_queue_size_index_phastlink_tx,
                $.internal_queue_size_index_icsplontalk_tx,
                $.internal_queue_size_index_icsp232_tx,
                $.internal_queue_size_index_icspip_tx,
                $.internal_queue_size_index_ni_device,
                $.true,
                $.false,
                $.file_read_only,
                $.file_rw_new,
                $.file_rw_append,
                $.ip_tcp,
                $.ip_udp,
                $.ip_udp_2way,
                $.xml_encode_types,
                $.xml_encode_char_as_list,
                $.xml_encode_le,
                $.xml_decode_types,
                $.xml_decode_no_preserve,
                $.duet_dev_type_display_device,
                $.duet_dev_type_rfidsystem_device,
                $.duet_dev_type_lightsystem_device,
                $.duet_dev_type_io_device,
                $.duet_dev_type_relay_device,
                $.duet_dev_type_ups,
                $.duet_dev_type_amplifier,
                $.duet_dev_type_audio_conferencer,
                $.duet_dev_type_audio_mixer,
                $.duet_dev_type_audio_processor,
                $.duet_dev_type_audio_tuner_device,
                $.duet_dev_type_camera,
                $.duet_dev_type_digital_media_encoder,
                $.duet_dev_type_digital_media_decoder,
                $.duet_dev_type_digital_media_server,
                $.duet_dev_type_dss,
                $.duet_dev_type_dvr,
                $.duet_dev_type_disc_device,
                $.duet_dev_type_document_camera,
                $.duet_dev_type_audio_tape,
                $.duet_dev_type_hvac,
                $.duet_dev_type_keypad,
                $.duet_dev_type_light,
                $.duet_dev_type_monitor,
                $.duet_dev_type_motor,
                $.duet_dev_type_multi_window,
                $.duet_dev_type_pool_spa,
                $.duet_dev_type_preamp_surround_sound_processor,
                $.duet_dev_type_receiver,
                $.duet_dev_type_security_system,
                $.duet_dev_type_sensor_device,
                $.duet_dev_type_settop_box,
                $.duet_dev_type_slide_projector,
                $.duet_dev_type_switcher,
                $.duet_dev_type_text_keypad,
                $.duet_dev_type_tv,
                $.duet_dev_type_utility,
                $.duet_dev_type_vcr,
                $.duet_dev_type_video_conferencer,
                $.duet_dev_type_video_processor,
                $.duet_dev_type_video_projector,
                $.duet_dev_type_video_wall,
                $.duet_dev_type_volume_controller,
                $.duet_dev_type_weather,
                $.duet_dev_not_polled,
                $.duet_dev_polled,
                $.clkmgr_mode_network,
                $.clkmgr_mode_standalone,
                $.normal_standby,
                $.normal_wake,
                $.ip_multicast_ttl_option,
                $.ip_ttl_subnet,
                $.ip_ttl_site,
                $.ip_ttl_region,
                $.ip_ttl_continent,
                $.ip_tcp_nodelay_option,
                $.ip_nodelay_on,
                $.ip_nodelay_off,
                $.amx_error,
                $.amx_warning,
                $.amx_info,
                $.amx_debug,
                $.netlinx_login_success,
                $.netlinx_login_fail,
                $.netlinx_logout,
                $.null_str,
                $.smtp_address,
                $.smtp_port_number,
                $.smtp_username,
                $.smtp_password,
                $.smtp_require_tls,
                $.smtp_from,
                $.smtp_tls_true,
                $.smtp_tls_false,
                $.listview_on_row_select_event,
                $.data_structure_unknown,
                $.data_structure_datafeed,
                $.data_structure_datarecordset,
                $.data_structure_datarecord,
                $.data_structure_datafield,
                $.data_max_content_field_count,
                $.data_max_metadata_field_count,
                $.data_max_id_length,
                $.data_max_name_length,
                $.data_max_description_length,
                $.data_max_type_length,
                $.data_max_format_length,
                $.data_max_source_length,
                $.data_max_value_length,
                $.data_max_label_length,
                $.data_max_url_length,
                $.max_last_login_info_length,
                $.data_type_unknown,
                $.data_type_string,
                $.data_type_datetime,
                $.data_type_date,
                $.data_type_time,
                $.data_type_image,
                $.data_format_url,
                $.data_format_phone,
                $.data_format_email,
                $.data_format_iso8601,
                $.auditlog_priv,
                $.configuration_priv,
                $.deviceconfig_priv,
                $.ftp_priv,
                $.http_priv,
                $.networkconfig_priv,
                $.programport_priv,
                $.remoteui_priv,
                $.securitycontrol_priv,
                $.softwaremanagement_priv,
                $.terminal_priv,
                $.tpadmin_priv,
                $.user1_priv,
                $.user2_priv,
                $.user3_priv,
                $.user4_priv,
                $.usermanagement_priv,
                $.valid_account,
                $.err_name_invalid,
                $.err_password_invalid,
                $.err_invalid_account,
                $.err_no_authorization,
                $.err_invalid_parameter,
                $.err_user_locked_out,
                $.err_user_account_expired,
                $.err_general_error,
                $.err_authentication_error,
                $.tls_ignore_certificate_errors,
                $.tls_validate_certificate,
            ),

        system_function: ($) =>
            choice(
                // Core string functions
                $.atoi,
                $.atol,
                $.atof,
                $.itoa,
                $.itohex,
                $.hextoi,
                $.ftoa,

                // String manipulation
                $.find_string,
                $.left_string,
                $.right_string,
                $.mid_string,
                $.remove_string,
                $.get_buffer_string,
                $.get_buffer_char,
                $.get_multi_buffer_string,
                $.length_string,
                $.max_length_string,
                $.set_length_string,
                $.compare_string,
                $.upper_string,
                $.lower_string,
                $.get_last,

                // Time and date functions
                $.date_to_day,
                $.date_to_month,
                $.date_to_year,
                $.time_to_hour,
                $.time_to_minute,
                $.time_to_second,
                $.day_of_week,
                $.set_pulse_time,
                $.set_timer,

                // File I/O functions
                $.file_open,
                $.file_close,
                $.file_read,
                $.file_read_line,
                $.file_write,
                $.file_write_line,
                $.file_copy,
                $.file_delete,
                $.file_rename,
                $.file_dir,
                $.file_getdir,
                $.file_setdir,
                $.file_create_dir,
                $.file_remove_dir,
                $.file_seek,

                // Array functions
                $.length_array,
                $.max_length_array,
                $.set_length_array,

                // Network functions
                $.ip_client_open,
                $.ip_client_close,
                $.ip_server_open,
                $.ip_server_close,
                $.ip_bound_client_open,
                $.ip_mc_server_open,
                $.ip_set_option,

                // Secure network functions
                $.ssh_client_open,
                $.ssh_client_close,
                $.tls_client_open,
                $.tls_client_close,

                // Device functions
                $.do_push,
                $.do_push_timed,
                $.do_release,
                $.device_id,
                $.device_info,
                $.device_id_string,
                $.device_standby,
                $.device_wake,

                // Timeline functions
                $.timeline_create,
                $.timeline_kill,
                $.timeline_reload,
                $.timeline_pause,
                $.timeline_restart,
                $.timeline_set,
                $.timeline_get,
                $.timeline_active,
                $.timeline_dynamic_id,

                // Variable conversion
                $.variable_to_string,
                $.string_to_variable,
                $.length_variable_to_string,
                $.type_cast,

                // XML functions
                $.variable_to_xml,
                $.xml_to_variable,
                $.length_variable_to_xml,

                // System functions
                $.redirect_string,
                $.random_number,
                $.get_unique_id,
                $.get_system_number,
                $.set_system_number,
                $.get_serial_number,
                $.get_master_build,
                $.set_validation_code,
                $.reboot,

                // Duet module functions
                $.load_duet_module,
                $.unload_duet_module,
                $.duet_mem_size_set,
                $.duet_mem_size_get,

                // Dynamic device functions
                $.dynamic_application_device,
                $.dynamic_polled_port,
                $.static_port_binding,
                $.static_ip_binding,

                // DNS and IP functions
                $.get_dns_list,
                $.set_dns_list,
                $.get_ip_address,
                $.set_ip_address,
                $.get_url_list,
                $.add_url_entry,
                $.delete_url_entry,

                // Math functions
                $.abs_value,
                $.max_value,
                $.min_value,
                $.exp_value,
                $.log_value,
                $.log10_value,
                $.power_value,
                $.sqrt_value,

                // Raw data functions
                $.raw_be,
                $.raw_le,

                // Queue functions
                $.internal_queue_size_set,
                $.internal_queue_size_get,
                $.internal_threshold_set,
                $.internal_threshold_get,

                // Event functions
                $.rebuilt_event,
                $.do_custom_event,

                // Clock manager functions
                $.clkmgr_is_network_sourced,
                $.clkmgr_set_clk_source,
                $.clkmgr_is_daylightsavings_on,
                $.clkmgr_set_daylightsavings_mode,
                $.clkmgr_get_timezone,
                $.clkmgr_set_timezone,
                $.clkmgr_get_resync_period,
                $.clkmgr_set_resync_period,
                $.clkmgr_get_daylightsavings_offset,
                $.clkmgr_set_daylightsavings_offset,
                $.clkmgr_get_active_timeserver,
                $.clkmgr_set_active_timeserver,
                $.clkmgr_get_timeservers,
                $.clkmgr_add_userdefined_timeserver,
                $.clkmgr_delete_userdefined_timeserver,
                $.clkmgr_get_start_daylightsavings_rule,
                $.clkmgr_set_start_daylightsavings_rule,
                $.clkmgr_get_end_daylightsavings_rule,
                $.clkmgr_set_end_daylightsavings_rule,

                // Logging functions
                $.set_log_level,
                $.get_log_level,
                $.amx_log,

                // Email functions
                $.smtp_server_config_set,
                $.smtp_server_config_get,
                $.smtp_send,

                // Account functions
                $.validate_netlinx_account,
                $.validate_netlinx_account_with_permission,
                $.authenticate_certificate,

                // Audit functions
                $.audit_netlinx_session_event,
                $.audit_netlinx_generic_event,

                // Disk functions
                $.get_available_flash_disk_space,
                $.get_max_flash_disk_space,

                // Data feed functions
                $.data_create_feed,
                $.data_delete_feed,
                $.data_publish_feed,
                $.data_get_published_feed,
                $.data_add_record,
                $.data_get_event_record,

                // WC data feed functions
                $._wc_data_create_feed,
                $._wc_data_add_record,
                $._wc_data_get_event_record,

                // Other specialized functions
                $.format,
                $.astro_clock,
                $.set_outdoor_temperature,
                $.set_virtual_level_count,
                $.set_virtual_channel_count,
                $.set_virtual_port_count,

                // Unimplemented functions
                $._wc_encode_int,
                $._wc_decode_int,
                $._wc_int,
                $._wc_to_ch_int,
                $._ch_to_wc_int,
                $._wc_find_string_int,
                $._wc_left_string_int,
                $._wc_lower_string_int,
                $._wc_mid_string_int,
                $._wc_remove_string_int,
                $._wc_right_string_int,
                $._wc_upper_string_int,
                $._wc_compare_string_int,
                $._wc_get_buffer_char_int,
                $._wc_get_buffer_string_int,
                $._wc_concat_string_int,
                $._wc_file_open_int,
                $._wc_file_close_int,
                $._wc_file_read_int,
                $._wc_file_read_line_int,
                $._wc_file_write_int,
                $._wc_file_write_line_int,
            ),

        system_type: ($) =>
            choice(
                // Event data types
                $.tdata,
                $.tchannel,
                $.tlevel,
                $.tbutton,
                $.ttimeline,
                $.tcustom,

                // Network structure types
                $.url_struct,
                $.dns_struct,
                $.ip_address_struct,

                // Device information
                $.dev_info_struct,

                // Clock manager
                $.clkmgr_timeserver_struct,

                // Data feed types
                $.data_feed,
                $.data_field,
                $.data_record,

                // Wide character data feed types
                $.wc_data_feed,
                $.wc_data_field,
                $.wc_data_record,

                // Login information
                $.last_login_info,
            ),

        assignment_expression: ($) =>
            prec.right(
                PREC.ASSIGNMENT,
                seq(
                    field("left", $._assignment_left_expression),
                    field("operator", "="),
                    field("right", choice($.initializer_list, $.expression)),
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
                alias($.system_variable, $.identifier),
            ),

        unary_expression: ($) =>
            prec.right(
                PREC.UNARY,
                seq(
                    field(
                        "operator",
                        choice("!", "~", "-", "+", $.bnot, $.not),
                    ),
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
                [$.and, PREC.LOGICAL_AND],
                [$.or, PREC.LOGICAL_OR],
                [$.xor, PREC.EXCLUSIVE_OR],
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
            return prec.right(
                PREC.UNARY,
                choice(
                    seq(argument, operator), // Post-increment/decrement (valid in NetLinx)
                    seq(operator, argument), // Pre-increment/decrement (parser support only)
                ),
            );
        },

        subscript_expression: ($) =>
            prec(
                PREC.SUBSCRIPT,
                seq(
                    field("argument", $.expression),
                    repeat1(
                        seq("[", field("index", optional($.expression)), "]"),
                    ),
                ),
            ),

        call_expression: ($) =>
            prec(
                PREC.CALL,
                seq(
                    field("function", choice($.system_function, $.expression)),
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
                        alias(
                            $.preproc_if_defined_in_initializer_list_no_comma,
                            $.preproc_if_defined,
                        ),
                        alias(
                            $.preproc_if_not_defined_in_initializer_list_no_comma,
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
