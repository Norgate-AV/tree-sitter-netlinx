#include 'device_api'
// ^ preprocessor
//        ^ string

#define MAX_CHANNELS 32
// ^ preprocessor
//       ^ constant
//                   ^ number

#if_defined DEBUG_MODE
// ^ preprocessor
//           ^ constant
STACK_VAR INTEGER debug_level = 5
// ^ keyword
//         ^ type
//                 ^ variable
//                            ^ operator
//                              ^ number
#else
// ^ preprocessor
CONSTANT INTEGER debug_level = 0
// ^ type.qualifier
//         ^ type
//                 ^ variable
//                           ^ operator
//                             ^ number
#end_if
// ^ preprocessor

#warn 'API v2.0 only'
// ^ preprocessor
//     ^ string
