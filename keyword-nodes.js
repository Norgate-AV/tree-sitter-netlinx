/**
 * @file NetLinx keyword node definitions for tree-sitter
 * @license MIT
 */

const keywords = require("./keywords");

/**
 * Creates keyword node rules
 *
 * @returns {object} Keyword node rules
 */
module.exports = {
    // Program and module keywords
    program_name_keyword: (_) => keywords.program_name,
    module_name_keyword: (_) => keywords.module_name,

    // Section header keywords
    define_device_keyword: (_) => keywords.define_device,
    define_combine_keyword: (_) => keywords.define_combine,
    define_constant_keyword: (_) => keywords.define_constant,
    define_type_keyword: (_) => keywords.define_type,
    define_variable_keyword: (_) => keywords.define_variable,
    define_connect_level_keyword: (_) => keywords.define_connect_level,
    define_latching_keyword: (_) => keywords.define_latching,
    define_mutually_exclusive_keyword: (_) =>
        keywords.define_mutually_exclusive,
    define_toggling_keyword: (_) => keywords.define_toggling,
    define_call_keyword: (_) => keywords.define_call,
    define_function_keyword: (_) => keywords.define_function,
    define_start_keyword: (_) => keywords.define_start,
    define_event_keyword: (_) => keywords.define_event,
    define_program_keyword: (_) => keywords.define_program,
    define_module_keyword: (_) => keywords.define_module,

    // Type keywords
    char_keyword: (_) => keywords.char,
    widechar_keyword: (_) => keywords.widechar,
    integer_keyword: (_) => keywords.integer,
    sinteger_keyword: (_) => keywords.sinteger,
    long_keyword: (_) => keywords.long,
    slong_keyword: (_) => keywords.slong,
    float_keyword: (_) => keywords.float,
    double_keyword: (_) => keywords.double,

    // Storage class keywords
    local_var_keyword: (_) => keywords.local_var,
    stack_var_keyword: (_) => keywords.stack_var,

    // Type qualifiers
    constant_keyword: (_) => keywords.constant,
    volatile_keyword: (_) => keywords.volatile,
    non_volatile_keyword: (_) => keywords.non_volatile,
    persistent_keyword: (_) => keywords.persistent,

    // Structured type keywords
    dev_keyword: (_) => keywords.dev,
    devlev_keyword: (_) => keywords.devlev,
    devchan_keyword: (_) => keywords.devchan,

    // Control flow keywords
    if_keyword: (_) => keywords.if,
    else_keyword: (_) => keywords.else,
    switch_keyword: (_) => keywords.switch,
    case_keyword: (_) => keywords.case,
    default_keyword: (_) => keywords.default,
    while_keyword: (_) => keywords.while,
    for_keyword: (_) => keywords.for,
    break_keyword: (_) => keywords.break,
    continue_keyword: (_) => keywords.continue,
    return_keyword: (_) => keywords.return,

    // Select statement keywords
    select_keyword: (_) => keywords.select,
    active_keyword: (_) => keywords.active,

    // Structure definition keywords
    struct_keyword: (_) => keywords.struct,
    structure_keyword: (_) => keywords.structure,

    // Event keywords
    button_event_keyword: (_) => keywords.button_event,
    channel_event_keyword: (_) => keywords.channel_event,
    level_event_keyword: (_) => keywords.level_event,
    data_event_keyword: (_) => keywords.data_event,
    timeline_event_keyword: (_) => keywords.timeline_event,
    custom_event_keyword: (_) => keywords.custom_event,

    // Button event types
    push_keyword: (_) => keywords.push,
    release_keyword: (_) => keywords.release,
    hold_keyword: (_) => keywords.hold,
    repeat_keyword: (_) => keywords.repeat,

    // Channel event types
    on_keyword: (_) => keywords.on,
    off_keyword: (_) => keywords.off,

    // Data event types
    online_keyword: (_) => keywords.online,
    offline_keyword: (_) => keywords.offline,
    onerror_keyword: (_) => keywords.onerror,
    string_keyword: (_) => keywords.string,
    command_keyword: (_) => keywords.command,
    standby_keyword: (_) => keywords.standby,
    awake_keyword: (_) => keywords.awake,

    // Statement keywords
    send_level_keyword: (_) => keywords.send_level,
    send_string_keyword: (_) => keywords.send_string,
    send_command_keyword: (_) => keywords.send_command,
    clear_buffer_keyword: (_) => keywords.clear_buffer,
    create_buffer_keyword: (_) => keywords.create_buffer,
    create_multi_buffer_keyword: (_) => keywords.create_multi_buffer,
    call_keyword: (_) => keywords.call,

    // DevChan operation keywords
    devchan_on_keyword: (_) => keywords.devchan_on,
    devchan_off_keyword: (_) => keywords.devchan_off,
    devchan_to_keyword: (_) => keywords.devchan_to,
    devchan_min_to_keyword: (_) => keywords.devchan_min_to,
    devchan_total_off_keyword: (_) => keywords.devchan_total_off,
    devchan_pulse_keyword: (_) => keywords.devchan_pulse,

    // Wait keywords
    wait_keyword: (_) => keywords.wait,
    cancel_wait_keyword: (_) => keywords.cancel_wait,
    wait_until_keyword: (_) => keywords.wait_until,
    cancel_wait_until_keyword: (_) => keywords.cancel_wait_until,
    cancel_all_wait_keyword: (_) => keywords.cancel_all_wait,
    cancel_all_wait_until_keyword: (_) => keywords.cancel_all_wait_until,
};
