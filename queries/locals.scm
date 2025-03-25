;; Scopes
;; ======

;; Function scope (parameters defined here are visible in the body)
(function_definition) @local.scope

;; Block scopes (these create new variable scopes)
(compound_statement) @local.scope

;; Loops and conditionals
(for_statement) @local.scope
(while_statement) @local.scope
(if_statement) @local.scope
(switch_statement) @local.scope
(select_statement) @local.scope
(wait_statement) @local.scope
(wait_until_statement) @local.scope

;; Event blocks
(button_event_type) @local.scope
(data_event_type) @local.scope
(channel_event_type) @local.scope

;; Definitions
;; ===========

;; Function parameters - directly connected to the function scope
(function_definition
  parameters: (parameter_list
    (parameter_declaration
      declarator: (identifier) @local.definition.parameter)))

;; Function definitions
(function_definition
  name: (identifier) @local.definition.function)

;; Local variables
(declaration
  (storage_class_specifier)
  declarator: (identifier) @local.definition.var)

;; Regular variable declarations
(declaration
  declarator: (identifier) @local.definition.var)

;; References
;; ==========

;; Any identifiers that are not part of declarations
(identifier) @local.reference

;; Exclude certain kinds of identifiers from being treated as references
;; For example, field names or type names
((field_expression
  field: (field_identifier)) @_field
 (#set! "local.reference" ""))

((type_specifier
  (identifier)) @_type
 (#set! "local.reference" ""))
