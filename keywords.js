/**
 * @file NetLinx keywords for tree-sitter
 * @license MIT
 */

module.exports = {
    // Program and module names
    program_name: /PROGRAM_NAME/i,
    module_name: /MODULE_NAME/i,

    // Section headers
    define_device: /DEFINE_DEVICE/i,
    define_combine: /DEFINE_COMBINE/i,
    define_constant: /DEFINE_CONSTANT/i,
    define_type: /DEFINE_TYPE/i,
    define_variable: /DEFINE_VARIABLE/i,
    define_connect_level: /DEFINE_CONNECT_LEVEL/i,
    define_latching: /DEFINE_LATCHING/i,
    define_mutually_exclusive: /DEFINE_MUTUALLY_EXCLUSIVE/i,
    define_toggling: /DEFINE_TOGGLING/i,
    define_call: /DEFINE_CALL/i,
    define_function: /DEFINE_FUNCTION/i,
    define_start: /DEFINE_START/i,
    define_event: /DEFINE_EVENT/i,
    define_program: /DEFINE_PROGRAM/i,
    define_module: /DEFINE_MODULE/i,

    // Types
    char: /CHAR/i,
    widechar: /WIDECHAR/i,
    integer: /INTEGER/i,
    sinteger: /SINTEGER/i,
    long: /LONG/i,
    slong: /SLONG/i,
    float: /FLOAT/i,
    double: /DOUBLE/i,

    // Type qualifiers
    constant: /CONSTANT/i,
    volatile: /VOLATILE/i,
    non_volatile: /NON_VOLATILE/i,
    persistent: /PERSISTENT/i,

    // Storage classes
    local_var: /LOCAL_VAR/i,
    stack_var: /STACK_VAR/i,

    // Control flow
    if: /IF/i,
    else: /ELSE/i,
    switch: /SWITCH/i,
    case: /CASE/i,
    default: /DEFAULT/i,
    while: /WHILE/i,
    for: /FOR/i,
    break: /BREAK/i,
    continue: /CONTINUE/i,
    return: /RETURN/i,
    select: /SELECT/i,
    active: /ACTIVE/i,

    // Struct
    struct: /STRUCT/i,
    structure: /STRUCTURE/i,

    // Events
    button_event: /BUTTON_EVENT/i,
    channel_event: /CHANNEL_EVENT/i,
    level_event: /LEVEL_EVENT/i,
    data_event: /DATA_EVENT/i,
    timeline_event: /TIMELINE_EVENT/i,

    // Add special function keywords needed for the parser
    send_level: /send_level/i,
    send_string: /send_string/i,
    send_command: /send_command/i,
    clear_buffer: /clear_buffer/i,
    create_buffer: /create_buffer/i,

    // Built-in Structured Types
    dev: /dev/i,
    devaddr: /devaddr/i,
    devchan: /devchan/i,
};
