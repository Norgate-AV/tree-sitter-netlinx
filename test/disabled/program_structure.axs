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

DEFINE_CONSTANT
// ^ keyword
INTEGER TIMEOUT = 30
// ^ type
//        ^ constant
//                ^ operator
//                  ^ number

DEFINE_VARIABLE
// ^ keyword
VOLATILE CHAR buffer[100]
// ^ type.qualifier
//         ^ type
//              ^ variable

DEFINE_START
// ^ keyword
{
    // Initialize
    buffer[0] = 0
    // ^ variable
    //      ^ number
    //         ^ operator
    //           ^ number

    timeline_create(1, 500, TIMELINE_ABSOLUTE, TIMELINE_REPEAT)
    // ^ function
}

DEFINE_FUNCTION refreshUI()
// ^ keyword
//             ^ function
{
    // Function body
    SEND_COMMAND dvTP, "'PPON-Setup'"
    // ^ function
    //            ^ variable
    //                   ^ string
}

DEFINE_PROGRAM
// ^ keyword
{
    // Main program logic
    IF (buffer[0] == 0)
    // ^ keyword
    //    ^ variable
    //           ^ operator
    //               ^ number
    {
        refreshUI()
        // ^ function
    }
}
