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
// ^ type.storage
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

#IF_DEFINED DEBUG
// ^ preprocessor
//           ^ constant
    #IF_DEFINED VERBOSE_LOGGING
//  ^ preprocessor
//              ^ constant
        STACK_VAR INTEGER debug_level = 3
//      ^ type.storage
//                ^ type
//                        ^ variable
//                                    ^ operator
//                                      ^ number
    #ELSE
//  ^ preprocessor
        STACK_VAR INTEGER debug_level = 1
//      ^ type.storage
//                ^ type
//                        ^ variable
//                                    ^ operator
//                                      ^ number
    #END_IF
//  ^ preprocessor
#END_IF
// ^ preprocessor
