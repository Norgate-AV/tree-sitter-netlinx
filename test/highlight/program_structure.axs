PROGRAM_NAME = 'MyProgram'
// ^ keyword
//           ^ operator
//             ^ string

DEFINE_DEVICE
// ^ keyword
dvTP = 10001:1:0
// <- variable
//   ^ operator
//     ^ number
//          ^ punctuation.delimiter
//           ^ number
//            ^ punctuation.delimiter
//             ^ number

DEFINE_CONSTANT
// ^ keyword
INTEGER TIMEOUT = 30
// ^ type
//        ^ constant
//              ^ operator
//                ^ number

DEFINE_VARIABLE
// ^ keyword
VOLATILE CHAR buffer[100]
// ^ type.qualifier
//         ^ type
//              ^ variable
//                  ^ punctuation.bracket
//                    ^ number
//                      ^ punctuation.bracket

DEFINE_START
// ^ keyword
{
// <- punctuation.bracket
    // Initialize
    // ^ comment
    buffer[0] = 0
    // ^ variable
    //    ^ punctuation.bracket
    //     ^ number
    //      ^ punctuation.bracket
    //        ^ operator
    //          ^ number

    timeline_create(1, 500, TIMELINE_ABSOLUTE, TIMELINE_REPEAT)

//  ^ function
//                 ^ punctuation.bracket
//                  ^ number
//                   ^ punctuation.delimiter
//                     ^ number
//                        ^ punctuation.delimiter
//                          ^ variable.parameter
//                                           ^ punctuation.delimiter
//                                             ^ variable.parameter
//                                                            ^ punctuation.bracket
}
// <- punctuation.bracket

DEFINE_FUNCTION refreshUI()
// ^ keyword
//              ^ function
//                       ^ punctuation.bracket
//                        ^ punctuation.bracket
{
// <- punctuation.bracket
    // Function body
    // ^ comment
    SEND_COMMAND dvTP, "'PPON-Setup'"
    // ^ keyword
    //           ^ variable
    //               ^ punctuation.delimiter
    //                 ^ string
    //                   ^ string
    //                              ^ string
}
// <- punctuation.bracket

DEFINE_PROGRAM
// ^ keyword
{
// <- punctuation.bracket
    // Main program logic
    // ^ comment
    IF (buffer[0] == 0)
//  ^ keyword
//     ^ punctuation.bracket
//      ^ variable
//            ^ punctuation.bracket
//             ^ number
//              ^ punctuation.bracket
//                ^ operator
//                   ^ number
//                    ^ punctuation.bracket
    {
//  ^ punctuation.bracket
        refreshUI()
    //  ^ function
    //           ^ punctuation.bracket
    //            ^ punctuation.bracket
    }
//  ^ punctuation.bracket
}
// <- punctuation.bracket
