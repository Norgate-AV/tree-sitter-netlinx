PROGRAM_NAME = 'Test Program'
// ^ keyword
//            ^ operator
//              ^ string

DEFINE_DEVICE
// ^ keyword
dvTP = 10001:1:0
// <- variable
//    ^ operator
//      ^ number

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
// ^ type
//         ^ type
{
    INTEGER id
//  ^ type
//          ^ property
}

DEFINE_VARIABLE
// ^ keyword
VOLATILE INTEGER count
// ^ keyword.modifier
//         ^ type
//                 ^ variable

DEFINE_START
// ^ keyword
{
    count = 1
//  ^ variable
//        ^ operator
//          ^ number
}

DEFINE_EVENT
// ^ keyword
