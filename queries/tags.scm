; Functions
(function_definition
  name: (identifier) @name) @definition.function

; Global variables
(global_variable_definition
  name: (identifier) @name) @definition.variable

; Constants
(constant_definition
  name: (identifier) @name) @definition.constant

; Structs
(struct_definition
  name: (identifier) @name) @definition.struct

; Module definitions
(module_definition
  instance_name: (identifier) @name) @definition.module

; Data/Button/Timeline event definitions
(data_event_definition) @definition.event
(button_event_definition) @definition.event
(timeline_event_definition) @definition.event

; Function parameters (references)
(parameter_declaration
  declarator: (identifier) @name) @reference.parameter

; Local variables (references)
(local_variable_declaration
  name: (identifier) @name) @reference.variable

; Device definitions
(device_definition
  (identifier) @name) @definition.device

; References to identifiers in expressions
(call_expression
  function: (identifier) @name) @reference.call
