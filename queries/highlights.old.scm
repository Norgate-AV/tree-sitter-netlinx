;; Identifiers
(identifier) @variable

;; Section definitions
(define_device_section) @keyword
(define_combine_section) @keyword
(define_connect_level_section) @keyword
(define_constant_section) @keyword
(define_type_section) @keyword
(define_mutually_exclusive_section) @keyword
(define_latching_section) @keyword
(define_toggling_section) @keyword
(define_variable_section) @keyword
(define_event_section) @keyword
(define_start_section) @keyword
(define_program_section) @keyword

;; Program and module headers
(program_name) @keyword
"=" @operator

(module_name) @keyword

;; Define keyword nodes
(define_function) @keyword
(define_call) @keyword
(define_module) @keyword

;; Types
(primitive_type) @type
(structured_type) @type
(type_specifier) @type
(storage_class_specifier) @storage
(type_qualifier) @keyword.modifier

;; Struct specifiers
(struct_specifier) @type

;; Event definitions
(button_event_definition) @keyword
(data_event_definition) @keyword
(level_event_definition) @keyword
(channel_event_definition) @keyword
(timeline_event_definition) @keyword
(custom_event_definition) @keyword

;; Event types
(button_event_type) @keyword
(data_event_type) @keyword
(channel_event_type) @keyword

;; Control flow
(if_statement) @keyword.control
(else_clause) @keyword.control
(for_statement) @keyword.control
(while_statement) @keyword.control
(switch_statement) @keyword.control
(case_statement) @keyword.control
(select_statement) @keyword.control
(active_block) @keyword.control
(break_statement) @keyword.control
(continue_statement) @keyword.control
(return_statement) @keyword.control

;; Wait statements
(wait_statement) @keyword
(wait_until_statement) @keyword
(cancel_wait_statement) @keyword
(cancel_wait_until_statement) @keyword
(cancel_all_wait_statement) @keyword
(cancel_all_wait_until_statement) @keyword

;; NetLinx-specific statements
(send_string_statement) @keyword.function
(send_command_statement) @keyword.function
(send_level_statement) @keyword.function
(create_buffer_statement) @keyword.function
(create_multi_buffer_statement) @keyword.function
(clear_buffer_statement) @keyword.function
(devchan_operation_statement) @keyword.function
;; (call_statement) @keyword.function

;; Functions
(function_definition
  name: (identifier) @function)

(call_expression
  function: (identifier) @function.call)

(call_definition
  name: (string_literal) @function)

;; Parameters
(parameter_declaration
  declarator: (identifier) @parameter)

;; Event references and parameters
(button_event_declarator) @keyword
(data_event_declarator) @keyword
(level_event_declarator) @keyword
(channel_event_declarator) @keyword
(timeline_event_declarator) @keyword
(custom_event_declarator) @keyword

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

;; Parameter lists
(parameter_list) @punctuation.bracket

;; Constants
(true) @constant.builtin
(false) @constant.builtin

;; Variables with constant qualifier
(declaration
  (type_qualifier) @_qualifier
  declarator: (identifier) @constant
  (#match? @_qualifier "constant|CONSTANT"))

;; Literals
(decimal_literal) @number
(hex_literal) @number
(number_literal) @number
(string_literal) @string
(string_content) @string
(device_literal) @number

;; Device references and expressions
(devchan_expression
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(devlev_expression
  "[" @punctuation.bracket
  "]" @punctuation.bracket)

(devchan_range_expression) @operator

;; Comments
(comment) @comment

;; Operators in expressions
(binary_expression
  operator: _) @operator

(unary_expression
  operator: _) @operator

(assignment_expression
  operator: _) @operator

(update_expression
  operator: _) @operator

(range_operator) @operator

;; Punctuation
"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
";" @punctuation.delimiter
"," @punctuation.delimiter
"." @punctuation.delimiter
":" @punctuation.delimiter

;; Preprocessor
(preproc_include) @preprocessor
(preproc_define) @preprocessor
(preproc_warn) @preprocessor
(preproc_disable_warning) @preprocessor
(preproc_if_defined) @preprocessor
(preproc_if_not_defined) @preprocessor
(preproc_else) @preprocessor
(preproc_end_if) @preprocessor

;; Preprocessor specifics
(preproc_disable_warning
  code: (decimal_literal) @number)

(preproc_include
  path: (string_literal) @string)

(preproc_define
  name: (identifier) @constant)

(preproc_if_defined
  name: (identifier) @constant)

(preproc_if_not_defined
  name: (identifier) @constant)
