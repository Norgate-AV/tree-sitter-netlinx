// Type qualifier before type
DEFINE_FUNCTION INTEGER MyFunc(CONSTANT INTEGER param1) {}

// Type qualifier after type
DEFINE_FUNCTION INTEGER MyFunc(INTEGER CONSTANT param1) {}

// Multiple qualifiers
DEFINE_FUNCTION INTEGER MyFunc(CONSTANT VOLATILE INTEGER param1) {}

// With arrays
DEFINE_FUNCTION INTEGER MyFunc(CONSTANT CHAR buffer[]) {}

// Function Declaration
DEFINE_LIBRARY_FUNCTION INTEGER MyFunc(CONSTANT INTEGER param1); // Function Declaration
