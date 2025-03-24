DEFINE_FUNCTION INTEGER calculateValue(INTEGER x, INTEGER y) {
// ^ keyword
//              ^ type
//                      ^ function
//                                     ^ type
//                                             ^ parameter
//                                                 ^ type
//                                                        ^ parameter

    STACK_VAR INTEGER result
    // ^ keyword
    //         ^ type
    //                 ^ variable

    result = x + y * 10
    // ^ variable
    //     ^ operator
    //       ^ variable
    //         ^ operator
    //           ^ variable
    //             ^ operator
    //               ^ number

    IF (result > 100) {
    // ^ keyword
    //    ^ punctuation.bracket
    //     ^ variable
    //            ^ operator
    //              ^ number
        result = result - 50
        // ^ variable
        //       ^ operator
        //         ^ variable
        //                ^ operator
        //                  ^ number
    }
    ELSE IF (result < 0) {
    // ^ keyword
    //      ^ keyword
        result = 0
        // ^ variable
        //       ^ operator
        //         ^ number
    }

    // Array access
    STACK_VAR INTEGER arr[5]
    // ^ keyword
    //         ^ type
    //                 ^ variable
    arr[0] = 10
    // ^ variable
    //  ^ punctuation.bracket
    //   ^ number
    //     ^ operator
    //       ^ number

    // Device reference
    [dvTP, 1] = result
    // ^ punctuation.bracket
    //  ^ variable
    //      ^ number
    //        ^ punctuation.bracket
    //          ^ operator
    //            ^ variable

    RETURN result
    // ^ keyword
    //      ^ variable
}
