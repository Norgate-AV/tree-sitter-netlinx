DEFINE_FUNCTION INTEGER calculateValue(INTEGER x, INTEGER y) {
// ^ keyword
//              ^ type
//                      ^ function
//                                    ^ punctuation.bracket
//                                     ^ type
//                                             ^ parameter
//                                              ^ punctuation.delimiter
//                                                ^ type
//                                                        ^ parameter
//                                                         ^ punctuation.bracket
//                                                           ^ punctuation.bracket

    STACK_VAR INTEGER result
    // ^ type.storage
    //         ^ type
    //                 ^ variable

    result = x band y bor z bxor 1 lshift 2 rshift 1 bnot x
    // ^ variable
    //     ^ operator
    //       ^ parameter
    //         ^ keyword
    //              ^ parameter
    //                ^ keyword
    //                    ^ variable
    //                      ^ keyword
    //                           ^ number
    //                             ^ keyword
    //                                    ^ number
    //                                       ^ keyword
    //                                             ^ number
    //                                                 ^ keyword
    //                                                    ^ parameter

    // String Expression
    // ^ comment
    result = "__file__, ' compiled on ', __ldate__, ' at ', __time__"
    // ^ variable
    //     ^ operator
    //       ^ string
    //         ^ variable.builtin
    //                ^ punctuation.delimiter
    //                  ^ string
    //                                 ^ punctuation.delimiter
    //                                    ^ variable.builtin
    //                                            ^ punctuation.delimiter
    //                                              ^ string
    //                                                    ^ punctuation.delimiter
    //                                                      ^ variable.builtin
    //                                                              ^ string

    // System Variables
    result = "push_channel, push_device, push_devchan"
    // ^ variable
    //     ^ operator
    //       ^ string
    //         ^ variable.builtin
    //                    ^ punctuation.delimiter
    //                      ^ variable.builtin
    //                                 ^ punctuation.delimiter
    //                                    ^ variable.builtin
    //                                               ^ string

    result = "release_channel, release_device, release_devchan"
    // ^ variable
    //     ^ operator
    //       ^ string
    //         ^ variable.builtin
    //                       ^ punctuation.delimiter
    //                         ^ variable.builtin
    //                                       ^ punctuation.delimiter
    //                                         ^ variable.builtin
    //                                                        ^ string

    result = "date, day, ldate, time, system_number"
    // ^ variable
    //     ^ operator
    //       ^ string
    //         ^ variable.builtin
    //            ^ punctuation.delimiter
    //              ^ variable.builtin
    //                 ^ punctuation.delimiter
    //                   ^ variable.builtin
    //                        ^ punctuation.delimiter
    //                          ^ variable.builtin
    //                              ^ punctuation.delimiter
    //                                 ^ variable.builtin
    //                                             ^ string

    result = x + y * 10
    // ^ variable
    //     ^ operator
    //       ^ parameter
    //         ^ operator
    //           ^ parameter
    //             ^ operator
    //               ^ number

    IF (result > 100) {
    // <- keyword
    // ^ punctuation.bracket
    //     ^ variable
    //         ^ operator
    //            ^ number
    //              ^ punctuation.bracket
    //                ^ punctuation.bracket
        result = result - 50
        // ^ variable
        //     ^ operator
        //         ^ variable
        //              ^ operator
        //                ^ number
    }
    // <- punctuation.bracket
    ELSE IF (result < 0) {
    // <- keyword
    //   ^ keyword
    //      ^ punctuation.bracket
    //          ^ variable
    //              ^ operator
    //                ^ number
    //                 ^ punctuation.bracket
    //                   ^ punctuation.bracket
        result = 0
        // ^ variable
        //     ^ operator
        //       ^ number
    }
    // <- punctuation.bracket

    // Array access
    // ^ comment
    STACK_VAR INTEGER arr[5]
    // ^ type.storage
    //         ^ type
    //                 ^ variable
    //                   ^ punctuation.bracket
    //                    ^ number
    //                     ^ punctuation.bracket
    arr[0] = 10
    // <- variable
    // ^ punctuation.bracket
    //  ^ number
    //   ^ punctuation.bracket
    //     ^ operator
    //       ^ number

    // Device reference
    // ^ comment
    [dvTP, 1] = result
    // <- punctuation.bracket
    // ^ variable
    //   ^ punctuation.delimiter
    //     ^ number
    //      ^ punctuation.bracket
    //        ^ operator
    //           ^ variable

    RETURN result
    // <- keyword
    //      ^ variable
}
// <- punctuation.bracket

// System constants assertions
DEFINE_FUNCTION testSystemConstants() {
// ^ keyword
//                       ^ function
//                                 ^ punctuation.bracket
//                                  ^ punctuation.bracket
//                                    ^ punctuation.bracket

    // Boolean constants
    // ^ comment
    flag1 = TRUE
    // ^ variable
    //    ^ operator
    //      ^ constant.builtin

    flag2 = FALSE
    // ^ variable
    //    ^ operator
    //      ^ constant.builtin

    // Timeline constants
    // ^ comment
    timeline_create(1, 500, TIMELINE_ABSOLUTE, TIMELINE_REPEAT)
    // ^ function.builtin
    //             ^ punctuation.bracket
    //              ^ number
    //               ^ punctuation.delimiter
    //                   ^ number
    //                    ^ punctuation.delimiter
    //                        ^ constant.builtin.parameter
    //                                       ^ punctuation.delimiter
    //                                          ^ constant.builtin.parameter
    //                                                        ^ punctuation.bracket

    timeline_create(2, 1000, TIMELINE_RELATIVE, TIMELINE_ONCE)
    // ^ function.builtin
    //             ^ punctuation.bracket
    //              ^ number
    //               ^ punctuation.delimiter
    //                   ^ number
    //                     ^ punctuation.delimiter
    //                         ^ constant.builtin.parameter
    //                                        ^ punctuation.delimiter
    //                                           ^ constant.builtin.parameter
    //                                                       ^ punctuation.bracket

    // Network constants
    // ^ comment
    selector = IP_TCP
    // ^ variable
    //       ^ operator
    //         ^ constant.builtin

    connection_type = IP_UDP_2WAY
    // ^ variable
    //              ^ operator
    //                ^ constant.builtin

    flag = URL_FLG_TCP
    // ^ variable
    //   ^ operator
    //      ^ constant.builtin

    // File handling constants
    // ^ comment
    file_mode1 = FILE_READ_ONLY
    // ^ variable
    //         ^ operator
    //           ^ constant.builtin

    file_mode2 = FILE_RW_NEW
    // ^ variable
    //         ^ operator
    //           ^ constant.builtin

    file_mode3 = FILE_RW_APPEND
    // ^ variable
    //         ^ operator
    //           ^ constant.builtin

    // Device constants
    // ^ comment
    id = FIRST_VIRTUAL_DEVICE + 10
    // <- variable
    // ^ operator
    //          ^ constant.builtin
    //                        ^ operator
    //                           ^ number

    port = FIRST_LOCAL_PORT
    // ^ variable
    //   ^ operator
    //      ^ constant.builtin

    dynamic_id = DYNAMIC_VIRTUAL_DEVICE
    // ^ variable
    //         ^ operator
    //           ^ constant.builtin

    // XML options
    // ^ comment
    xml_option = XML_ENCODE_CHAR_AS_LIST | XML_ENCODE_TYPES
    // ^ variable
    //         ^ operator
    //           ^ constant.builtin
    //                                   ^ operator
    //                                     ^ constant.builtin

    // Duet device types
    // ^ comment
    dev_type = DUET_DEV_TYPE_DISPLAY_DEVICE
    // ^ variable
    //       ^ operator
    //         ^ constant.builtin

    audio_type = DUET_DEV_TYPE_AUDIO_PROCESSOR
    // ^ variable
    //         ^ operator
    //           ^ constant.builtin

    // Clock manager constants
    // ^ comment
    mode = CLKMGR_MODE_NETWORK
    // ^ variable
    //   ^ operator
    //      ^ constant.builtin

    mode = NORMAL_STANDBY
    // ^ variable
    //   ^ operator
    //         ^ constant.builtin

    mode = NORMAL_WAKE
    // ^ variable
    //   ^ operator
    //      ^ constant.builtin

    // Network settings
    // ^ comment
    ttl = IP_TTL_SUBNET
    // <- variable
    //  ^ operator
    //     ^ constant.builtin

    nodelay = IP_NODELAY_ON
    // ^ variable
    //      ^ operator
    //         ^ constant.builtin

    // Log levels
    // ^ comment
    log_level = AMX_DEBUG
    // ^ variable
    //        ^ operator
    //          ^ constant.builtin

    login_result = NETLINX_LOGIN_SUCCESS
    // ^ variable
    //           ^ operator
    //             ^ constant.builtin

    // Data constants
    // ^ comment
    data_format = DATA_FORMAT_ISO8601
    // ^ variable
    //          ^ operator
    //            ^ constant.builtin

    type = DATA_TYPE_DATETIME
    // ^ variable
    //   ^ operator
    //      ^ constant.builtin

    error = ERR_INVALID_PARAMETER
    // ^ variable
    //    ^ operator
    //       ^ constant.builtin

    // Mixed with other expressions
    // ^ comment
    complex = (IP_TCP == IP_UDP) || (TIMELINE_ONCE != TIMELINE_REPEAT)
    // ^ variable
    //      ^ operator
    //        ^ punctuation.bracket
    //          ^ constant.builtin
    //                ^ operator
    //                   ^ constant.builtin
    //                         ^ punctuation.bracket
    //                           ^ operator
    //                              ^ punctuation.bracket
    //                               ^ constant.builtin
    //                                             ^ operator
    //                                                ^ constant.builtin
    //                                                               ^ punctuation.bracket
}
// <- punctuation.bracket
