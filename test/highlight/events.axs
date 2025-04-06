DEFINE_EVENT
// ^ keyword

BUTTON_EVENT[dvTP,1]
// ^ keyword
//          ^ punctuation.bracket
//            ^ variable
//                ^ number
//                 ^ punctuation.bracket
{
// <- punctuation.bracket
    PUSH:
    // ^ keyword
    //  ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Function call
        // ^ comment
        doSomething(10)
        // ^ function
        //         ^ punctuation.bracket
        //           ^ number
        //            ^ punctuation.bracket
    }
    // <- punctuation.bracket

    RELEASE:
    // ^ keyword
    //     ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // String literal
        // ^ comment
        SEND_COMMAND dvTP, "'TEXT-1,0,Button Released'"
        // ^ keyword
        //            ^ variable
        //               ^ punctuation.delimiter
        //                 ^ string
        //                   ^ string
        //                                            ^ string
    }
    // <- punctuation.bracket

    HOLD[2]:
    // ^ keyword
    //  ^ punctuation.bracket
    //   ^ number
    //    ^ punctuation.bracket
    //     ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Binary expression
        // ^ comment
        counter = counter + 1
        // ^ variable
        //      ^ operator
        //          ^ variable
        //                ^ operator
        //                  ^ number
    }
    // <- punctuation.bracket
}
// <- punctuation.bracket

DATA_EVENT[dvTP]
// ^ keyword
//        ^ punctuation.bracket
//          ^ variable
//             ^ punctuation.bracket
{
// <- punctuation.bracket
    ONLINE:
    // ^ keyword
    //    ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Device control
        // ^ comment
        ON[dvTP,10]
        // <- keyword
        //^ punctuation.bracket
        //   ^ variable
        //     ^ punctuation.delimiter
        //       ^ number
        //        ^ punctuation.bracket
    }
    // <- punctuation.bracket

    OFFLINE:
    // ^ keyword
    //     ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Hex literal
        // ^ comment
        counter = $FF
        // ^ variable
        //      ^ operator
        //         ^ number
    }
    // <- punctuation.bracket

    STRING:
    // ^ keyword
    //    ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // String expression
        // ^ comment
        message = "'Received: ', DATA.TEXT"
        // ^ variable
        //      ^ operator
        //        ^ string
        //                ^ string
        //                     ^ punctuation.delimiter
        //                       ^ constant
        //                           ^ punctuation.delimiter
        //                             ^ property
        //                                ^ string
    }
    // <- punctuation.bracket

    COMMAND:
    // <- keyword
    //     ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Command handler
        // ^ comment
    }
    // <- punctuation.bracket
}
// <- punctuation.bracket

channel_event[vdvObject, 1]
// <- keyword
//           ^ punctuation.bracket
//             ^ variable
//                       ^ number
//                        ^ punctuation.bracket
{
// <- punctuation.bracket
    on:
    // <- keyword
    //^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Channel event handler
        // ^ comment
        SEND_COMMAND dvTP, "'Channel 1 ON'"
        // ^ keyword
        //            ^ variable
        //               ^ punctuation.delimiter
        //                 ^ string
        //                   ^ string
        //                                ^ string
    }
    // <- punctuation.bracket
    off:
    // <- keyword
    // ^ punctuation.delimiter
    {
    // <- punctuation.bracket
        // Channel event handler
        // ^ comment
        SEND_COMMAND dvTP, "'Channel 1 OFF'"
        // ^ keyword
        //            ^ variable
        //               ^ punctuation.delimiter
        //                 ^ string
        //                   ^ string
        //                                ^ string
    }
    // <- punctuation.bracket
}

level_event[dvTP, 1]
// <- keyword
//         ^ punctuation.bracket
//           ^ variable
//                ^ number
//                 ^ punctuation.bracket
{
// <- punctuation.bracket
    send_string 0:1:0, "'New level:', itoa(level.value)"
    // ^ keyword
    //          ^ number
    //           ^ punctuation.delimiter
    //            ^ number
    //             ^ punctuation.delimiter
    //              ^ number
    //               ^ punctuation.delimiter
    //                 ^ string
    //                   ^ string
    //                              ^ punctuation.delimiter
    //                                ^ function.builtin
    //                                    ^ punctuation.bracket
    //                                      ^ variable
    //                                          ^ punctuation.delimiter
    //                                             ^ property
    //                                                ^ punctuation.bracket
    //                                                 ^ string
}
// <- punctuation.bracket

timeline_event[TL1]
// <- keyword
//            ^ punctuation.bracket
//              ^ constant
//                ^ punctuation.bracket
{
// <- punctuation.bracket
    // Timeline event code
    // ^ comment
}
// <- punctuation.bracket

custom_event[dvTP, 1, 1001]
// <- keyword
//          ^ punctuation.bracket
//            ^ variable
//               ^ punctuation.delimiter
//                 ^ number
//                  ^ punctuation.delimiter
//                    ^ number
//                        ^ punctuation.bracket
{
// <- punctuation.bracket
    // Custom event code
    // ^ comment
}
// <- punctuation.bracket
