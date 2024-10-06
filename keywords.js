module.exports = {
    program_name: /program_name/i,
    module_name: /module_name/i,

    /**
     * Define Sections
     */
    define_device: /define_device/i,
    define_combine: /define_combine/i,
    define_connect_level: /define_connect_level/i,
    define_constant: /define_constant/i,
    define_device: /define_device/i,
    define_event: /define_event/i,
    define_function: /define_function/i,
    define_latching: /define_latching/i,
    define_mutually_exclusive: /define_mutually_exclusive/i,
    define_program: /define_program/i,
    define_start: /define_start/i,
    define_toggling: /define_toggling/i,
    define_type: /define_type/i,

    /**
     * Global Storage Classes
     */
    constant: /constant/i,
    non_volatile: /non_volatile/i,
    persistent: /persistent/i,
    volatile: /volatile/i,

    /**
     * Local Storage Classes
     */
    local_var: /local_var/i,
    stack_var: /stack_var/i,

    /**
     * Primitive Data Types
     */
    char: /char/i,
    widechar: /widechar/i,
    integer: /integer/i,
    sinteger: /sinteger/i,
    long: /long/i,
    slong: /slong/i,
    float: /float/i,
    double: /double/i,

    /**
     * Structered Types
     */
    struct: /struct(ure)?/i,
    dev: /dev/i,
    devchan: /devchan/i,
    devlev: /devlev/i,

    /**
     * Event Handlers
     */
    button_event: /button_event/i,
    channel_event: /channel_event/i,
    custom_event: /custom_event/i,
    data_event: /data_event/i,
    level_event: /level_event/i,
    timeline_event: /timeline_event/i,

    /**
     * Button Events
     */
    push: /push/i,
    hold: /hold/i,
    release: /release/i,

    /**
     * Channel Events
     */
    on: /on/i,
    off: /off/i,

    /**
     * Data Events
     */
    online: /online/i,
    offline: /offline/i,
    command: /command/i,
    string: /string/i,
    standby: /standby/i,
    awake: /awake/i,
    onerror: /onerror/i,

    /**
     * NetLinx Commands
     */
    send_command: /send_command/i,
    send_level: /send_level/i,
    send_string: /send_string/i,

    /**
     * Language Elements
     */
    for: /for/i,
    if: /if/i,
    else: /else/i,
    while: /while/i,
    break: /break/i,
    continue: /continue/i,
    return: /return/i,
    case: /case/i,
    switch: /switch/i,
    default: /default/i,
    select: /select/i,
    active: /active/i,
    wait: /wait/i,
    wait_until: /wait_until/i,
    call: /call/i,
};
