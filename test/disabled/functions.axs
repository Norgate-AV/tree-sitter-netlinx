DEFINE_FUNCTION INTEGER MyFunction(INTEGER param1, CHAR param2[])
// ^ keyword
//               ^ type
//                       ^ function
//                                  ^ type
//                                          ^ parameter
//                                                  ^ type
//                                                       ^ parameter
{
    RETURN param1 + LENGTH_ARRAY(param2)
//  ^ keyword.control
//         ^ parameter
//                ^ operator
//                  ^ function.call
//                               ^ parameter
}

DEFINE_CALL 'MyCallFunction'(INTEGER param)
// ^ keyword
//           ^ function
//                            ^ type
//                                    ^ parameter
{
    // Some code here
}

// Function call example
INTEGER result
// ^ type
//      ^ variable
result = MyFunction(10, 'test')
// ^ variable
//      ^ operator
//        ^ function.call
//                   ^ number
//                      ^ string
