;; Structure and class definitions
(struct_specifier name: (type_identifier) @name body:(_)) @definition.class

;; Functions
(function_declarator declarator: (identifier) @name) @definition.function
(function_definition name: (identifier) @name) @definition.function

;; Variables and constants
(declaration
  declarator: (identifier) @name) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (identifier) @name)) @definition.variable

(declaration
  (type_qualifier (constant_keyword))
  declarator: (init_declarator
    declarator: (identifier) @name)) @definition.constant

;; Module definitions
(module_definition instance_name: (identifier) @name) @definition.module

;; Event handlers
(button_event_declarator) @definition.event
(channel_event_declarator) @definition.event
(data_event_declarator) @definition.event
(level_event_declarator) @definition.event
(timeline_event_declarator) @definition.event
(custom_event_declarator) @definition.event

;; Parameters
(parameter_declaration
  declarator: (identifier) @name) @definition.parameter

;; References to functions/modules/etc
(call_expression function: (identifier) @name) @reference.call
