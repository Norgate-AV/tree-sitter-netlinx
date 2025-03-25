a
b = 5

// TYPE ONLY
integer a

// TYPE WITH INITIALIZATION
integer d = 5

// TYPE QUALIFIER WITH TYPE
constant integer CONST_INT = 100
volatile integer vol_int = 5

// STORAGE CLASS WITH TYPE
stack_var integer local1
local_var integer local2 = 20

// TYPE QUALIFIER WITHOUT TYPE (IMPLICIT INTEGER) - WORKING CASE
constant A = 1
volatile B = 2

// STORAGE CLASS WITHOUT TYPE (IMPLICIT INTEGER) - PROBLEMATIC CASE
stack_var x
local_var y = 25
local_var z

// COMBINATIONS
stack_var constant integer BUFFER_SIZE = 1024
