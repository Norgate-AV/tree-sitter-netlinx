DEFINE_FUNCTION INTEGER MyFunction(INTEGER param1)
// ^ keyword
//               ^ type
//                       ^ function
//                                ^ punctuation.bracket
//                                  ^ type
//                                          ^ parameter
//                                               ^ punctuation.bracket
{
// <- punctuation.bracket
    stack_var char date[10]
    // ^ type.storage
    //        ^ type
    //             ^ variable
    //                 ^ punctuation.bracket
    //                   ^ number
    //                    ^ punctuation.bracket

    date = '2023-10-01'
    // ^ variable
    //   ^ operator
    //     ^ string
    result = "'The date is: ', date"
    // ^ variable
    //     ^ operator
    //       ^ string
    //        ^ string
    //                       ^ punctuation.delimiter
    //                         ^ keyword
    //                             ^ string
    result = "'The time is: ', time"
    // ^ variable
    //     ^ operator
    //       ^ string
    //        ^ string
    //                       ^ punctuation.delimiter
    //                         ^ keyword
    //                             ^ string
    RETURN param1
//  ^ keyword
//         ^ parameter
}
// <- punctuation.bracket
