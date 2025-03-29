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

VOLATILE SystemConfig mySystem
// ^ type.qualifier
//         ^ type
//                    ^ variable

// Nested field access
// ^ comment
mySystem.version = 2
// ^ variable
//      ^ punctuation.delimiter
//         ^ property
//               ^ operator
//                 ^ number

mySystem.primaryDevice.powerState = 1
// ^ variable
//      ^ punctuation.delimiter
//         ^ property
//                    ^ punctuation.delimiter
//                      ^ property
//                                ^ operator
//                                  ^ number

INTEGER myArray[5] = {1, 2, 3, 4, 5}
// ^ type
//      ^ variable
//             ^ punctuation.bracket
//              ^ number
//               ^ punctuation.bracket
//                 ^ operator
//                   ^ punctuation.bracket
//                    ^ number
//                     ^ punctuation.delimiter
//                       ^ number
//                        ^ punctuation.delimiter
//                          ^ number
//                           ^ punctuation.delimiter
//                             ^ number
//                              ^ punctuation.delimiter
//                                ^ number
//                                 ^ punctuation.bracket

PERSISTENT CHAR nameBuffer[50]
// ^ type.qualifier
//           ^ type
//                ^ variable
//                        ^ punctuation.bracket
//                         ^ number
//                           ^ punctuation.bracket

NON_VOLATILE SINTEGER counter
// ^ type.qualifier
//            ^ type
//                    ^ variable

CONSTANT INTEGER MAX_SIZE = 100
// ^ type.qualifier
//         ^ type
//                 ^ constant
//                        ^ operator
//                           ^ number

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
    // Test devchan operations
    // ^ comment
    ON[dvTP, BTN_PLAY]
    // <- keyword
    //^ punctuation.bracket
    //   ^ variable
    //     ^ punctuation.delimiter
    //         ^ constant
    //               ^ punctuation.bracket

    SEND_LEVEL dvTP, 1, 255
    // ^ keyword
    //          ^ variable
    //             ^ punctuation.delimiter
    //               ^ number
    //                ^ punctuation.delimiter
    //                  ^ number
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

    SELECT
    // ^ keyword
    {
    // <- punctuation.bracket
        ACTIVE(x > 10):
    //  ^ keyword
    //        ^ punctuation.bracket
    //         ^ variable
    //           ^ operator
    //             ^ number
    //               ^ punctuation.bracket
    //                ^ punctuation.delimiter
        {
        // <- punctuation.bracket
            // Active block
            // ^ comment
        }
        // <- punctuation.bracket

        ACTIVE(y < 5):
    //  ^ keyword
    //        ^ punctuation.bracket
    //         ^ variable
    //           ^ operator
    //             ^ number
    //              ^ punctuation.bracket
    //               ^ punctuation.delimiter
        {
        // <- punctuation.bracket
            // Another active block
            // ^ comment
        }
        // <- punctuation.bracket
    }
    // <- punctuation.bracket
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
