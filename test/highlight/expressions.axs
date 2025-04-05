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
    //         ^ keyword
    //                ^ punctuation.delimiter
    //                  ^ string
    //                                 ^ punctuation.delimiter
    //                                    ^ keyword
    //                                            ^ punctuation.delimiter
    //                                              ^ string
    //                                                    ^ punctuation.delimiter
    //                                                      ^ keyword
    //                                                              ^ string

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
