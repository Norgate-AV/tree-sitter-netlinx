PROGRAM_NAME='define_variable'

DEFINE_FUNCTION CHAR[100] FormatStatus(DeviceStatus status) {
    // STACK_VAR CHAR result[100]

    // // A "String Expression", or more widely known as "String Interpolation"
    // result = "'Device: ', status.name, 'Power: ', ITOA(status.isPowered), 'Volume: ', ITOA(status.volume)"

    RETURN ''
}

define_function TestFunc1() {}

define_function integer TestFunc1(integer a, integer, b) {}
