; Identifiers
(identifier) @variable

; Types
(primitive_type) @type

; Keywords - match the actual section nodes instead of text
(define_device_section) @keyword
(define_constant_section) @keyword
(define_type_section) @keyword
(define_variable_section) @keyword
;; (define_function_section) @keyword
;; (define_module_section) @keyword
;(define_program_section) @keyword

; Structure definitions
(struct_definition) @keyword

; Control flow - use node types not text literals
; Currently commented out until we implement these nodes
; (if_statement) @keyword.control
; (else_clause) @keyword.control
; (for_statement) @keyword.control
; (while_statement) @keyword.control
; (switch_statement) @keyword.control
; (case_statement) @keyword.control
; (break_statement) @keyword.control
; (continue_statement) @keyword.control
; (return_statement) @keyword.control
; (select_statement) @keyword.control
; (active_statement) @keyword.control

; Type qualifiers
(type_qualifier) @keyword.modifier

; Storage classes
(storage_class_specifier) @keyword.modifier

; Program name
(program_name) @keyword
(module_name) @keyword

; Literals
(string_literal) @string
(number_literal) @number
(decimal_literal) @number
(hex_literal) @number
(device_literal) @number

; Comments
(comment) @comment

; Function calls and definitions
(call_expression
  function: (identifier) @function.call)

(function_definition
  name: (identifier) @function)

; Preprocessor directives
(preproc_directive) @preproc
(preproc_include) @preproc.include
(preproc_define) @preproc.define
(preproc_if_defined) @preproc.directive
(preproc_if_not_defined) @preproc.directive
(preproc_else) @preproc.directive
(preproc_end_if) @preproc.directive

; Operators
["=" "+" "-" "*" "/" ":" ";"] @operator
