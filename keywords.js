/**
 * @file NetLinx keywords for tree-sitter
 * @license MIT
 */

module.exports = {
    // Program and module names
    program_name: /program_name/i,
    module_name: /module_name/i,

    // Section headers
    define_device: /define_device/i,
    define_combine: /define_combine/i,
    define_constant: /define_constant/i,
    define_type: /define_type/i,
    define_variable: /define_variable/i,
    define_connect_level: /define_connect_level/i,
    define_latching: /define_latching/i,
    define_mutually_exclusive: /define_mutually_exclusive/i,
    define_toggling: /define_toggling/i,
    define_call: /define_call/i,
    define_function: /define_function/i,
    define_start: /define_start/i,
    define_event: /define_event/i,
    define_program: /define_program/i,
    define_module: /define_module/i,

    // Types
    char: /char/i,
    widechar: /widechar/i,
    integer: /integer/i,
    sinteger: /sinteger/i,
    long: /long/i,
    slong: /slong/i,
    float: /float/i,
    double: /double/i,

    // Type qualifiers
    constant: /constant/i,
    volatile: /volatile/i,
    non_volatile: /non_volatile/i,
    persistent: /persistent/i,

    // Storage classes
    local_var: /local_var/i,
    stack_var: /stack_var/i,

    // Control flow
    if: /if/i,
    else: /else/i,
    switch: /switch/i,
    case: /case/i,
    default: /default/i,
    while: /while/i,
    for: /for/i,
    break: /break/i,
    continue: /continue/i,
    return: /return/i,
    select: /select/i,
    active: /active/i,

    // Struct
    struct: /struct/i,
    structure: /structure/i,

    // Events Handlers
    button_event: /button_event/i,
    channel_event: /channel_event/i,
    level_event: /level_event/i,
    data_event: /data_event/i,
    timeline_event: /timeline_event/i,
    custom_event: /custom_event/i,

    // Events
    push: /push/i,
    release: /release/i,
    hold: /hold/i,
    on: /on/i,
    off: /off/i,
    online: /online/i,
    offline: /offline/i,
    onerror: /onerror/i,
    string: /string/i,
    command: /command/i,
    standby: /standby/i,
    awake: /awake/i,
    repeat: /repeat/i,

    // Add special function keywords needed for the parser
    send_level: /send_level/i,
    send_string: /send_string/i,
    send_command: /send_command/i,
    clear_buffer: /clear_buffer/i,
    create_buffer: /create_buffer/i,

    // Built-in Structured Types
    dev: /dev/i,
    devlev: /devlev/i,
    devchan: /devchan/i,

    // Devchan operations
    devchan_on: /on/i,
    devchan_off: /off/i,
    devchan_to: /to/i,
    devchan_min_to: /min_to/i,
    devchan_total_off: /total_off/i,
    devchan_pulse: /pulse/i,

    // Objects
    channel: /channel/i,
    device: /device/i,
    number: /number/i,
    port: /port/i,
    system: /system/i,
    sourcedev: /sourcedev/i,
    button: /button/i,
    input: /input/i,
    holdtime: /holdtime/i,
    level: /level/i,
    value: /value/i,
    data: /data/i,
    text: /text/i,
    sourceipaddress: /sourceipaddress/i,
    serveripaddress: /serveripaddress/i,
    sourceport: /sourceport/i,
    custom: /custom/i,
    id: /id/i,
    type: /type/i,
    flag: /flag/i,
    value1: /value1/i,
    value2: /value2/i,
    value3: /value3/i,
    encode: /encode/i,

    // Waits
    wait: /wait/i,
    wait_until: /wait_until/i,
};
