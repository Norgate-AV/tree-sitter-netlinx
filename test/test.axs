PROGRAM_NAME='Function Tests'

DEFINE_FUNCTION CHAR[100] FormatStatus(DeviceStatus status) {
    STACK_VAR CHAR result[100]

    // A "String Expression", or more widely known as "String Interpolation"
    result = "'Device: ', status.name, 'Power: ', ITOA(status.isPowered), 'Volume: ', ITOA(status.volume)"

    RETURN ''
}

define_function TestForLoop() {
    stack_var integer x

    x = 0

    for (x = 1; x <= 10; x++) {
        if (x < 5) {
            continue
        }
        else {
            amx_log(4, "'Current value: ', itoa(x)")
        }

        break
    }
}

define_function TestWhileLoop() {
    integer i

    i = 0
    while (i < 10) {
        amx_log(4, "'Current value in while: ', itoa(i)")
        i++
    }
}

define_function TestSwitchCase(integer value) {
    switch (value) {
        case 1: {
            amx_log(4, "'Value is 1'")
            // breaks are not required in NetLinx
            // No fall through by default
        }
        case 2: {
            amx_log(4, "'Value is 2'");
            break;
        }
        case SOME_CONSTANT:
            amx_log(4, "'Value is SOME_CONSTANT'");
            amx_log(4, "'Value is SOME_CONSTANT'");

        default: {
            amx_log(4, "'Value is unknown'");
        }
    }
}

define_function integer ReturnParamSumTest(integer a, integer b) {
    local_var integer sum

    sum = a + b

    return sum
}

define_function char TestSelectActive(integer a, integer b) {
    select {
        active (a < b): {
            return true
        }
        active (a > b): {
            return false
        }
        active (true): {
            return false
        }
    }
}
