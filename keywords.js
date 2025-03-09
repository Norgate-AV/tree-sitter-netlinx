/**
 * @file NetLinx keywords for tree-sitter
 * @license MIT
 */

module.exports = {
    // Program and module names
    program_name: 'PROGRAM_NAME',
    module_name: 'MODULE_NAME',

    // Section headers
    define_device: 'DEFINE_DEVICE',
    define_combine: 'DEFINE_COMBINE',
    define_constant: 'DEFINE_CONSTANT',
    define_type: 'DEFINE_TYPE',
    define_variable: 'DEFINE_VARIABLE',
    define_connect_level: 'DEFINE_CONNECT_LEVEL',
    define_latching: 'DEFINE_LATCHING',
    define_mutually_exclusive: 'DEFINE_MUTUALLY_EXCLUSIVE',
    define_toggling: 'DEFINE_TOGGLING',
    define_call: 'DEFINE_CALL',
    define_function: 'DEFINE_FUNCTION',
    define_start: 'DEFINE_START',
    define_event: 'DEFINE_EVENT',
    define_program: 'DEFINE_PROGRAM',

    // Types
    char: 'CHAR',
    widechar: 'WIDECHAR',
    integer: 'INTEGER',
    sinteger: 'SINTEGER',
    long: 'LONG',
    slong: 'SLONG',
    float: 'FLOAT',
    double: 'DOUBLE',

    // Type qualifiers
    constant: 'CONSTANT',
    volatile: 'VOLATILE',
    non_volatile: 'NON_VOLATILE',
    persistent: 'PERSISTENT',

    // Storage classes
    local_var: 'LOCAL_VAR',
    stack_var: 'STACK_VAR',

    // Control flow
    if: 'IF',
    else: 'ELSE',
    switch: 'SWITCH',
    case: 'CASE',
    default: 'DEFAULT',
    while: 'WHILE',
    for: 'FOR',
    break: 'BREAK',
    continue: 'CONTINUE',
    return: 'RETURN',

    // Structure
    struct: 'STRUCTURE',
    structure: 'STRUCTURE',

    // Events
    button_event: 'BUTTON_EVENT',
    channel_event: 'CHANNEL_EVENT',
    level_event: 'LEVEL_EVENT',
    data_event: 'DATA_EVENT',
    timeline_event: 'TIMELINE_EVENT',
};
