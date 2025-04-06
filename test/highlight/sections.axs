PROGRAM_NAME = 'Test Program'
// ^ keyword
//           ^ operator
//              ^ string

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
INTEGER MY_CONSTANT = 100
// ^ type
//      ^ constant
//                  ^ operator
//                    ^ number

DEFINE_TYPE
// ^ keyword
STRUCTURE MyStructure
// ^ keyword
//         ^ type.custom
{
// <- punctuation.bracket
    INTEGER id
//  ^ type
//          ^ property
}
// <- punctuation.bracket

DEFINE_VARIABLE
// ^ keyword
VOLATILE INTEGER count
// ^ type.qualifier
//         ^ type
//                 ^ variable
persistent DeviceStatus status
// ^ type.qualifier
//             ^ type.custom
//                      ^ variable

DEFINE_START
// ^ keyword
{
// <- punctuation.bracket
    count = 1
//  ^ variable
//        ^ operator
//          ^ number
}
// <- punctuation.bracket

define_module 'MyModule' module(vdvObject, dvPort)
// ^ keyword
//             ^ string
//                       ^ variable
//                             ^ punctuation.bracket
//                               ^ variable
//                                       ^ punctuation.delimiter
//                                         ^ variable
//                                               ^ punctuation.bracket

DEFINE_EVENT
// ^ keyword
[dvTP, VOL_MUTE] = (mute == true)
// <- punctuation.bracket
// ^ variable
//   ^ punctuation.delimiter
//     ^ constant
//             ^ punctuation.bracket
//               ^ operator
//                 ^ punctuation.bracket
//                  ^ variable
//                       ^ operator
//                          ^ constant.builtin
//                              ^ punctuation.bracket
