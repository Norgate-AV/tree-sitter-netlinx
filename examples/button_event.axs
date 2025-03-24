BUTTON_EVENT[dvTP, BTN_HOME] {
    PUSH: {}
    RELEASE: {}
    hold[100]: {}
    hold[1, repeat]: {}
}

button_event[dvDevChan]
button_event[10001:1:0, 1]
button_event[DVA_DEVCHAN[1]] {
    PUSH: {}
    RELEASE: {}
    hold[100]: {}
    hold[1, repeat]: {}
}
