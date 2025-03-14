PROGRAM_NAME='Test'

define_function char[100] CharArrayFunction() {
    stack_var char result[100]
    return result
}

define_function char CharFunction() {
    return true
}

DEFINE_START {
    on[vdvObject, 15]
    off[vdvObject, 16]
    pulse[vdvObject, 17]
}

DEFINE_PROGRAM

[dvTP, VOL_MUTE] = (mute == true)
