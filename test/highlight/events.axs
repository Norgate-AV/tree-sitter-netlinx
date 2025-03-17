DEFINE_EVENT
// ^ keyword

BUTTON_EVENT[dvTP,1]
// ^ keyword
//           ^ punctuation.bracket
//            ^ variable
//                ^ number
{
    PUSH:
    // ^ type
    //   ^ punctuation
    {
        // Function call
        doSomething(10)
        // ^ function
        //           ^ number
    }

    RELEASE:
    // ^ type
    //      ^ punctuation
    {
        // String literal
        SEND_COMMAND dvTP, "'TEXT-1,0,Button Released'"
        // ^ function
        //            ^ variable
        //                   ^ string
    }

    HOLD[2]:
    // ^ type
    //   ^ punctuation.bracket
    //    ^ number
    //     ^ punctuation.bracket
    //      ^ punctuation
    {
        // Binary expression
        counter = counter + 1
        // ^ variable
        //        ^ operator
        //          ^ variable
        //                  ^ operator
        //                    ^ number
    }
}

DATA_EVENT[dvTP]
// ^ keyword
//         ^ punctuation.bracket
//          ^ variable
//              ^ punctuation.bracket
{
    ONLINE:
    // ^ type
    //     ^ punctuation
    {
        // Device control
        ON[dvTP,10]
        // ^ function
        //  ^ punctuation.bracket
        //   ^ variable
        //       ^ number
        //         ^ punctuation.bracket
    }

    OFFLINE:
    // ^ type
    //      ^ punctuation
    {
        // Hex literal
        counter = $FF
        // ^ variable
        //        ^ operator
        //          ^ number
    }

    STRING:
    // ^ type
    //     ^ punctuation
    {
        // String expression
        message = "Received: ,DATA.TEXT"
        // ^ variable
        //        ^ operator
        //          ^ string
    }
}
