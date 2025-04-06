timeline_create(1, 500, TIMELINE_ABSOLUTE, TIMELINE_REPEAT)
// <- function.builtin
//             ^ punctuation.bracket
//              ^ number
//               ^ punctuation.delimiter
//                 ^ number
//                    ^ punctuation.delimiter
//                      ^ constant.builtin.parameter
//                                       ^ punctuation.delimiter
//                                         ^ constant.builtin.parameter
//                                                        ^ punctuation.bracket

// System functions highlight tests
// ^ comment

// String functions
// ^ comment
str1 = ITOA(42)
// <- variable
//   ^ operator
//     ^ function.builtin
//         ^ punctuation.bracket
//          ^ number
//            ^ punctuation.bracket

str2 = FTOA(3.14)
// <- variable
//   ^ operator
//     ^ function.builtin
//         ^ punctuation.bracket
//          ^ number
//           ^ number
//            ^ number
//              ^ punctuation.bracket

num1 = ATOI('123')
// <- variable
//   ^ operator
//     ^ function.builtin
//         ^ punctuation.bracket
//          ^ string
//               ^ punctuation.bracket

hex_str = ITOHEX(255)
// <- variable
//      ^ operator
//        ^ function.builtin
//              ^ punctuation.bracket
//               ^ number
//                  ^ punctuation.bracket

// String manipulation functions
// ^ comment
pos = FIND_STRING('Hello World', 'World')
// <- variable
//  ^ operator
//    ^ function.builtin
//               ^ punctuation.bracket
//                ^ string
//                             ^ punctuation.delimiter
//                               ^ string
//                                      ^ punctuation.bracket

left_part = LEFT_STRING('Hello World', 5)
// <- variable
//        ^ operator
//          ^ function.builtin
//                     ^ punctuation.bracket
//                      ^ string
//                                   ^ punctuation.delimiter
//                                     ^ number
//                                      ^ punctuation.bracket

right_part = RIGHT_STRING('Hello World', 5)
// <- variable
//         ^ operator
//           ^ function.builtin
//                       ^ punctuation.bracket
//                        ^ string
//                                     ^ punctuation.delimiter
//                                       ^ number
//                                        ^ punctuation.bracket

mid_part = MID_STRING('Hello World', 3, 5)
// <- variable
//       ^ operator
//         ^ function.builtin
//                   ^ punctuation.bracket
//                    ^ string
//                                 ^ punctuation.delimiter
//                                   ^ number
//                                    ^ punctuation.delimiter
//                                      ^ number
//                                       ^ punctuation.bracket

len = LENGTH_STRING('Hello')
// <- variable
//  ^ operator
//    ^ function.builtin
//                 ^ punctuation.bracket
//                  ^ string
//                         ^ punctuation.bracket

// Date and time functions
// ^ comment
day = DATE_TO_DAY(date)
// <- variable
//  ^ operator
//    ^ function.builtin
//               ^ punctuation.bracket
//                ^ variable.builtin
//                    ^ punctuation.bracket

month = DATE_TO_MONTH(date)
// <- variable
//    ^ operator
//      ^ function.builtin
//                   ^ punctuation.bracket
//                    ^ variable.builtin
//                        ^ punctuation.bracket

year = DATE_TO_YEAR(date)
// <- variable
//   ^ operator
//     ^ function.builtin
//                 ^ punctuation.bracket
//                  ^ variable.builtin
//                      ^ punctuation.bracket

hour = TIME_TO_HOUR(time)
// <- variable
//   ^ operator
//     ^ function.builtin
//                 ^ punctuation.bracket
//                  ^ variable.builtin
//                      ^ punctuation.bracket

// Array functions
// ^ comment
arr_len = LENGTH_ARRAY(my_array)
// <- variable
//      ^ operator
//        ^ function.builtin
//                    ^ punctuation.bracket
//                     ^ variable.parameter
//                             ^ punctuation.bracket

max_arr_len = MAX_LENGTH_ARRAY(my_array)
// <- variable
//          ^ operator
//            ^ function.builtin
//                            ^ punctuation.bracket
//                             ^ variable.parameter
//                                     ^ punctuation.bracket

// Device functions
// ^ comment
DO_PUSH(dvTP, 1)
// ^ function.builtin
//     ^ punctuation.bracket
//       ^ variable.parameter
//          ^ punctuation.delimiter
//            ^ number
//             ^ punctuation.bracket

DO_PUSH_TIMED(dvTP, 2, 3000)
// ^ function.builtin
//           ^ punctuation.bracket
//             ^ variable.parameter
//                ^ punctuation.delimiter
//                  ^ number
//                   ^ punctuation.delimiter
//                      ^ number
//                         ^ punctuation.bracket

id = DEVICE_ID(dvTP)
// <- variable
// ^ operator
//   ^ function.builtin
//            ^ punctuation.bracket
//             ^ variable.parameter
//                 ^ punctuation.bracket

TIMELINE_KILL(1)
// ^ function.builtin
//           ^ punctuation.bracket
//            ^ number
//             ^ punctuation.bracket

// Math functions
// ^ comment
abs = ABS_VALUE(-42)
// <- variable
//  ^ operator
//    ^ function.builtin
//             ^ punctuation.bracket
//              ^ number
//                 ^ punctuation.bracket

max = MAX_VALUE(10, 20)
// <- variable
//  ^ operator
//    ^ function.builtin
//             ^ punctuation.bracket
//              ^ number
//                ^ punctuation.delimiter
//                  ^ number
//                    ^ punctuation.bracket

sqrt_val = SQRT_VALUE(16)
// <- variable
//       ^ operator
//         ^ function.builtin
//                   ^ punctuation.bracket
//                    ^ number
//                      ^ punctuation.bracket

// Network functions
// ^ comment
IP_CLIENT_OPEN(dvDevice, 1, '192.168.1.100', 23, IP_TCP)
// ^ function.builtin
//            ^ punctuation.bracket
//               ^ variable.parameter
//                     ^ punctuation.delimiter
//                       ^ number
//                        ^ punctuation.delimiter
//                            ^ string
//                                         ^ punctuation.delimiter
//                                           ^ number
//                                             ^ punctuation.delimiter
//                                               ^ constant.builtin.parameter
//                                                     ^ punctuation.bracket

// System functions
// ^ comment
REBOOT()
// ^ function.builtin
//    ^ punctuation.bracket
//     ^ punctuation.bracket

id = GET_UNIQUE_ID()
// <- variable
// ^ operator
//   ^ function.builtin
//                ^ punctuation.bracket
//                 ^ punctuation.bracket

// Complex nested example
// ^ comment
result = ITOA(MAX_VALUE(ATOI('10'), SQRT_VALUE(16)))
// <- variable
//     ^ operator
//       ^ function.builtin
//           ^ punctuation.bracket
//            ^ function.builtin
//                     ^ punctuation.bracket
//                      ^ function.builtin
//                          ^ punctuation.bracket
//                            ^ string
//                               ^ punctuation.bracket
//                                ^ punctuation.delimiter
//                                   ^ function.builtin
//                                            ^ punctuation.bracket
//                                             ^ number
//                                               ^ punctuation.bracket
//                                                ^ punctuation.bracket
//                                                 ^ punctuation.bracket
