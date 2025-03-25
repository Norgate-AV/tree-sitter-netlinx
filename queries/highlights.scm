;; Comments
(comment) @comment

;; Identifiers
;; (identifier) @identifier

(identifier) @variable

((identifier) @constant
 (#match? @constant "^[A-Z][A-Z\\d_]*$"))

;; Constants
[
    (true)
    (false)
] @constant.builtin

;; Keywords
[
    (program_name_keyword)
    (module_name_keyword)
    (define_device_keyword)
    (define_constant_keyword)
    (define_type_keyword)
    (define_variable_keyword)
    (define_start_keyword)
    (define_event_keyword)
    (define_mutually_exclusive_keyword)
    (define_function_keyword)
    (define_combine_keyword)
    (define_connect_level_keyword)
    (define_latching_keyword)
    (define_toggling_keyword)
    (define_program_keyword)
    (define_call_keyword)
    (define_module_keyword)

    (local_var_keyword)
    (stack_var_keyword)
    (constant_keyword)
    (volatile_keyword)
    (non_volatile_keyword)
    (persistent_keyword)

    (if_keyword)
    (else_keyword)
    (switch_keyword)
    (case_keyword)
    (default_keyword)
    (while_keyword)
    (for_keyword)
    (break_keyword)
    (continue_keyword)
    (return_keyword)
    (select_keyword)
    (active_keyword)

    (push_keyword)
    (release_keyword)
    (hold_keyword)
    (repeat_keyword)

    (on_keyword)
    (off_keyword)

    (online_keyword)
    (offline_keyword)
    (onerror_keyword)
    (string_keyword)
    (command_keyword)
    (awake_keyword)
    (standby_keyword)

    (send_level_keyword)
    (send_string_keyword)
    (send_command_keyword)
    (clear_buffer_keyword)
    (create_buffer_keyword)
    (create_multi_buffer_keyword)
    ;; (call_keyword)

    (devchan_on_keyword)
    (devchan_off_keyword)
    (devchan_to_keyword)
    (devchan_min_to_keyword)
    (devchan_total_off_keyword)
    (devchan_pulse_keyword)

    (wait_keyword)
    (wait_until_keyword)
    (cancel_wait_keyword)
    (cancel_wait_until_keyword)
    (cancel_all_wait_keyword)
    (cancel_all_wait_until_keyword)

    (button_event_keyword)
    (channel_event_keyword)
    (data_event_keyword)
    (level_event_keyword)
    (timeline_event_keyword)
    (custom_event_keyword)

    (preproc_include_keyword)
    (preproc_define_keyword)
    (preproc_warn_keyword)
    (preproc_disable_warning_keyword)
    (preproc_if_defined_keyword)
    (preproc_if_not_defined_keyword)
    (preproc_else_keyword)
    (preproc_end_if_keyword)

    (struct_keyword)
    (structure_keyword)
] @keyword

;; Types
[
    (char_keyword)
    (widechar_keyword)
    (integer_keyword)
    (sinteger_keyword)
    (long_keyword)
    (slong_keyword)
    (float_keyword)
    (double_keyword)
    (dev_keyword)
    (devlev_keyword)
    (devchan_keyword)
] @type

;; (primitive_type) @type
;; (structured_type) @type
;; (type_specifier) @type
(storage_class_specifier) @storage
(type_qualifier) @keyword.modifier

;; Struct specifiers
;; (struct_specifier) @type

;; Parameters
(parameter_declaration
  declarator: (identifier) @parameter)

;; Event types
;; (button_event_type) @keyword
;; (data_event_type) @keyword
;; (channel_event_type) @keyword

;; Control flow
;; (if_statement) @keyword.control
;; (else_clause) @keyword.control
;; (for_statement) @keyword.control
;; (while_statement) @keyword.control
;; (switch_statement) @keyword.control
;; (case_statement) @keyword.control
;; (select_statement) @keyword.control
;; (active_block) @keyword.control
;; (break_statement) @keyword.control
;; (continue_statement) @keyword.control
;; (return_statement) @keyword.control

;; Wait statements
;; (wait_statement) @keyword
;; (wait_until_statement) @keyword
;; (cancel_wait_statement) @keyword
;; (cancel_wait_until_statement) @keyword
;; (cancel_all_wait_statement) @keyword
;; (cancel_all_wait_until_statement) @keyword

;; NetLinx-specific statements
;; (send_string_statement) @keyword.function
;; (send_command_statement) @keyword.function
;; (send_level_statement) @keyword.function
;; (create_buffer_statement) @keyword.function
;; (create_multi_buffer_statement) @keyword.function
;; (clear_buffer_statement) @keyword.function
;; (devchan_operation_statement) @keyword.function
;; (call_statement) @keyword.function

;; Event references and parameters
;; (button_event_declarator) @keyword
;; (data_event_declarator) @keyword
;; (level_event_declarator) @keyword
;; (channel_event_declarator) @keyword
;; (timeline_event_declarator) @keyword
;; (custom_event_declarator) @keyword

;; Brackets in references
(button_event_devchan_reference
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(data_event_device_reference
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(level_event_devlev_reference
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(channel_event_devchan_reference
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(timeline_event_id_reference
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(custom_event_reference
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

;; Device references and expressions
(devchan_expression
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(devlev_expression
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

;; Parameter lists
(parameter_list) @punctuation.bracket

;; Operators
[
    "="
    "+"
    "-"
    "*"
    "/"
    "%"
    ">"
    "<"
    "&"
    "|"
    "^"
    "!"
    "~"
    "&&"
    "||"
    "=="
    "!="
    "<="
    ">="
    "<<"
    ">>"
    "++"
    "--"
    "<>"
    (range_operator)
] @operator

;; Operators in expressions
;; (binary_expression
;;   operator: _) @operator

;; (unary_expression
;;   operator: _) @operator

;; (assignment_expression
;;   operator: _) @operator

;; (update_expression
;;   operator: _) @operator

;; Punctuation
[
    "("
    ")"
    "{"
    "}"
    "["
    "]"
] @punctuation.bracket

[
    "."
    ";"
    ","
    ":"
] @punctuation.delimiter

(field_identifier) @property

;; Functions
(call_expression
  function: (identifier) @function)
;; (function_definition
;;   name: (identifier) @function)
(function_definition
  name: declarator: (identifier) @function)
(call_expression
  function: (identifier) @function.call)
;; (call_definition
;;   name: (string_literal) @function)

;; Literals
(string_literal) @string
(number_literal) @number
(hex_literal) @number
(device_literal) @number
"\"" @string

;; Preprocessor specifics
;; (preproc_disable_warning
;;   code: (decimal_literal) @number)

;; (preproc_include
;;   path: (string_literal) @string)

;; (preproc_define
;;   name: (identifier) @constant)

;; (preproc_if_defined
;;   name: (identifier) @constant)

;; (preproc_if_not_defined
;;   name: (identifier) @constant)

;; Variables with constant qualifier
;; (declaration
;;   (type_qualifier) @_qualifier
;;   declarator: (identifier) @constant
;;   (#match? @_qualifier "constant|CONSTANT"))

;; Function parameters
;; Parameters in declaration
(parameter_declaration
  declarator: (identifier) @parameter)

;; Parameters in function definition
(function_definition
  parameters: (parameter_list
    (parameter_declaration
      declarator: (identifier) @parameter)))

;; Parameters in call definition
(call_definition
  parameters: (parameter_list
    (parameter_declaration
      declarator: (identifier) @parameter)))

;; Parameters in function declarator
(function_declarator
  parameters: (parameter_list
    (parameter_declaration
      declarator: (identifier) @parameter)))

;; Function calls with arguments
(call_expression
  arguments: (argument_list
    (identifier) @variable.parameter))

;; Parameter types
(parameter_declaration
  (type_specifier) @type)

;; Parameter references within function bodies
((identifier) @parameter
 (#is? @parameter @local.reference)
 (#is? @parameter @local.scope "parameter"))

;; Parameter references
((identifier) @parameter
 (#is? @local.reference)
 (#is? @local.definition.parameter))
