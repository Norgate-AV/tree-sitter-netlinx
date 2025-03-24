;; Identifiers
(identifier) @variable

;; Types
(primitive_type) @type

;; Keywords - match the actual section nodes instead of text
(define_device_section) @keyword
(define_constant_section) @keyword
(define_type_section) @keyword
(define_variable_section) @keyword
;; (define_function_section) @keyword
;; (define_module_section) @keyword
(define_program_section) @keyword

;; Structure definitions
;; (struct_definition) @keyword

;; Control flow - use node types not text literals
(if_statement) @keyword.control
(else_clause) @keyword.control
(for_statement) @keyword.control
(while_statement) @keyword.control
(switch_statement) @keyword.control
(case_statement) @keyword.control
(break_statement) @keyword.control
(continue_statement) @keyword.control
(return_statement) @keyword.control
(select_statement) @keyword.control

;; Type qualifiers
(type_qualifier) @keyword.modifier

;; Storage classes
(storage_class_specifier) @keyword.modifier

;; Program name
(program_name) @keyword
(module_name) @keyword

;; Literals
(string_literal) @string
(number_literal) @number
(decimal_literal) @number
(hex_literal) @number
;; Device literals
(device_literal) @number
(device_literal
  device: (number_literal) @number
  port: (number_literal) @number
  system: (number_literal) @number)

;; Comments
(comment) @comment

;; Function calls and definitions
(call_expression
  function: (identifier) @function.call)

(function_definition
  name: (identifier) @function)

;; Function parameters
(parameter_declaration
  declarator: (identifier) @parameter)

;; Constants in declarations
(declaration
  declarator: (identifier) @constant
  .
  (storage_class_specifier) @_storage
  .
  (type_qualifier) @_qualifier
  (#match? @_storage "constant|CONSTANT")
  (#match? @_qualifier "constant|CONSTANT"))

;; Preprocessor directives
(preproc_include) @preprocessor
(preproc_define) @preprocessor
(preproc_if_defined) @preprocessor
(preproc_if_not_defined) @preprocessor
(preproc_else) @preprocessor
(preproc_end_if) @preprocessor
(preproc_include
  path: (string_literal) @string) @preprocessor

(preproc_define
  name: (identifier) @constant) @preprocessor

;; Operators
["=" "+" "-" "*" "/" ">" "<" "==" "!=" ">=" "<=" "&&" "||" "!"] @operator

;; Punctuation
[":" ";" "," "." "[" "]" "{" "}"] @punctuation

;; Sections
(define_device_section) @keyword
(define_constant_section) @keyword
(define_type_section) @keyword
(define_variable_section) @keyword
(define_toggling_section) @keyword
(define_latching_section) @keyword
(define_program_section) @keyword
(define_start_section) @keyword
(define_mutually_exclusive_section) @keyword
(define_combine_section) @keyword
(define_connect_level_section) @keyword
(define_event_section) @keyword

(button_event_type) @keyword
(channel_event_type) @keyword
(data_event_type) @keyword

;; Event declarations
(button_event_definition) @keyword
(channel_event_definition) @keyword
(data_event_definition) @keyword
(level_event_definition) @keyword
(timeline_event_definition) @keyword
(custom_event_definition) @keyword
