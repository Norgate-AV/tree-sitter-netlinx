PROGRAM_NAME = 'test_program'
// ^ keyword
//           ^ operator
//             ^ string

DEFINE_DEVICE
// ^ keyword
dvTP = 10001:1:0
// <- variable
//   ^ operator
//     ^ number
//          ^ number
//            ^ number

DEFINE_CONSTANT
// ^ keyword
INTEGER MAX_SIZE = 100
// ^ type
//        ^ constant
//                ^ operator
//                  ^ number

DEFINE_TYPE
// ^ keyword
STRUCTURE MyStruct {
// ^ keyword
//         ^ type
    INTEGER value
    // ^ type
    //       ^ property
    CHAR name[20]
    // ^ type
    //     ^ property
}

DEFINE_VARIABLE
// ^ keyword
VOLATILE INTEGER counter
// ^ type.qualifier
//         ^ type
//                 ^ variable

DEFINE_MUTUALLY_EXCLUSIVE
// ^ keyword
([dvTP,1],[dvTP,2],[dvTP,3])
// <- punctuation.bracket
//  ^ variable
//      ^ number
//            ^ variable
//                ^ number
//                      ^ variable
//                          ^ number

DEFINE_FUNCTION
// ^ keyword
INTEGER myFunction(INTEGER param1, CHAR param2[]) {
// ^ type
//        ^ function
//                   ^ type
//                           ^ parameter
//                                  ^ type
//                                       ^ parameter
    RETURN param1 + 5
    // ^ keyword
}
