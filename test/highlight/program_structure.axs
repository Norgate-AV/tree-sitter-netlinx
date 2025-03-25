PROGRAM_NAME = 'MyProgram'
// ^ keyword
//           ^ operator
//             ^ string

DEFINE_DEVICE
dvTP = 10001:1:0
// <- variable
//   ^ operator
//     ^ number

DEFINE_CONSTANT
INTEGER TIMEOUT = 30
// ^ type
//        ^ constant
//              ^ operator
//                ^ number

DEFINE_VARIABLE
VOLATILE CHAR buffer[100]
// ^ type.qualifier
//         ^ type
//              ^ variable
//                    ^ number

DEFINE_START
{
    // Initialize
    buffer[0] = 0
    // ^ variable
    //     ^ number
    //        ^ operator
    //          ^ number
    timeline_create(1, 500, TIMELINE_ABSOLUTE, TIMELINE_REPEAT)

//  ^ function
//                  ^ number
//                     ^ number
//                          ^ variable.parameter
//                                             ^ variable.parameter
}

DEFINE_FUNCTION refreshUI()
// ^ keyword
//              ^ function
{
    // Function body
    SEND_COMMAND dvTP, "'PPON-Setup'"
    // ^ keyword
    //            ^ variable
    //                   ^ string
}

DEFINE_PROGRAM
{
    // Main program logic
    IF (buffer[0] == 0)
//  ^ keyword
//      ^ variable
//             ^ number
//                ^ operator
//                   ^ number
    {
        refreshUI()
    //  ^ function
    }
}
