(identifier) @variable

((identifier) @constant
 (#match? @constant "^[A-Z][A-Z\\d_]*$"))

"active" @keyword
"break" @keyword
"case" @keyword
"constant" @keyword
"continue" @keyword
"default" @keyword
"else" @keyword
"for" @keyword
"if" @keyword
"local_var" @keyword
"nonvolatile" @keyword
"persistent" @keyword
"return" @keyword
"select" @keyword
"stack_var" @keyword
"struct" @keyword
"structure" @keyword
"switch" @keyword
"volatile" @keyword
"while" @keyword

"#define" @keyword
"#else" @keyword
"#end_if" @keyword
"#if_defined" @keyword
"#if_not_defined" @keyword
"#include" @keyword

"--" @operator
"-" @operator
"=" @operator
"!=" @operator
"*" @operator
"&" @operator
"&&" @operator
"+" @operator
"++" @operator
"<" @operator
"==" @operator
">" @operator
"||" @operator

"." @delimiter
";" @delimiter

(string_literal) @string

(number_literal) @number
(char_literal) @number

(comment) @comment
