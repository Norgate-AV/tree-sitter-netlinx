DEFINE_FUNCTION INTEGER MyFunction(INTEGER param1, CHAR param2[])
// ^ keyword
//               ^ type
//                       ^ function
//                                ^ punctuation.bracket
//                                  ^ type
//                                          ^ parameter
//                                               ^ punctuation.delimiter
//                                                  ^ type
//                                                       ^ parameter
//                                                            ^ punctuation.bracket
//                                                             ^ punctuation.bracket
//                                                              ^ punctuation.bracket
{
// <- punctuation.bracket
    RETURN param1 + LENGTH_ARRAY(param2)
//  ^ keyword
//         ^ parameter
//                ^ operator
//                  ^ function
//                              ^ punctuation.bracket
//                               ^ parameter
//                                     ^ punctuation.bracket
}
// <- punctuation.bracket

DEFINE_CALL 'MyCallFunction'(INTEGER param)
// ^ keyword
//           ^ string
//                          ^ punctuation.bracket
//                            ^ type
//                                    ^ parameter
//                                        ^ punctuation.bracket
{
// <- punctuation.bracket
    // Some code here
    // ^ comment
}
// <- punctuation.bracket

// Function call example
// ^ comment
INTEGER result
// ^ type
//      ^ variable
result = MyFunction(10, 'test')
// ^ variable
//     ^ operator
//        ^ function
//                 ^ punctuation.bracket
//                   ^ number
//                    ^ punctuation.delimiter
//                       ^ string
//                            ^ punctuation.bracket

call 'MyCallFunction'(result)
// <- keyword
//    ^ string
//                   ^ punctuation.bracket
//                     ^ variable
//                          ^ punctuation.bracket
