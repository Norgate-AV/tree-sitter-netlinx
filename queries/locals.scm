;; Scopes
;; ======

;; Block scopes
(compound_statement) @local.scope
(function_definition) @local.scope
(parameter_list) @local.scope

;; Loops and conditionals
(for_statement) @local.scope
(while_statement) @local.scope
(if_statement) @local.scope
(switch_statement) @local.scope
(select_statement) @local.scope
(wait_statement) @local.scope
(wait_until_statement) @local.scope

;; Event blocks
;; (button_event_block) @local.scope
;; (channel_event_block) @local.scope
;; (data_event_block) @local.scope
;; (level_event_block) @local.scope
;; (timeline_event_block) @local.scope
;; (custom_event_block) @local.scope
(button_event_type) @local.scope
(data_event_type) @local.scope
(channel_event_type) @local.scope

;; Definitions
;; ===========

;; Local variables
;; (declaration
;;   type: (type_specifier)
;;   name: (identifier) @local.definition)

;; Function parameters
(parameter_declaration
  declarator: (identifier) @local.definition)

;; Function definitions
(function_definition
  name: (identifier) @local.definition.function)

;; References
;; ==========

;; Any identifiers that are not part of declarations
(identifier) @local.reference

;; Exclude certain kinds of identifiers from being treated as references
;; For example, field names or type names
(field_expression
  field: (field_identifier) @local.reference)

(type_specifier
  (identifier) @local.reference)

;; Parameter definitions
;; (parameter_declaration
;;   declarator: (identifier) @local.definition.parameter)

;; All identifier references
;; (identifier) @local.reference

;; Parameter list defines scope
;; (parameter_list) @local.scope

;; Scopes
;; (compound_statement) @local.scope
;; (function_definition) @local.scope
;; (parameter_list) @local.scope

;; Definitions
;; (parameter_declaration
;;   declarator: (identifier) @local.definition.parameter)

;; References
;; (identifier) @local.reference
