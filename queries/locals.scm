; Scopes
; =======

; Block scopes
(compound_statement) @local.scope
;; (function_definition) @local.scope
(parameter_list) @local.scope

; Loops and conditionals also create their own scope
(for_statement) @local.scope
(while_statement) @local.scope
(if_statement) @local.scope
(switch_statement) @local.scope
(select_statement) @local.scope

; Event blocks are scopes
;; (button_event_block) @local.scope
;; (channel_event_block) @local.scope
;; (data_event_block) @local.scope

; Definitions
; ===========

; Local variables
;; (local_variable_declaration
;;   type: (type_specifier)
;;   name: (identifier) @local.definition)

; Function parameters
(parameter_declaration
  declarator: (identifier) @local.definition)

; Function definitions
;; (function_definition
;;   name: (identifier) @local.definition.function)

; References
; ==========

; Any identifiers that are not part of declarations
(identifier) @local.reference

; Exclude certain kinds of identifiers from being treated as references
; For example, field names or type names
(field_expression
  field: (field_identifier) @local.reference)

(type_specifier
  (identifier) @local.reference)
