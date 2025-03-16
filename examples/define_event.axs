PROGRAM_NAME='define_event'

DEFINE_EVENT

DATA_EVENT[dvDevice]
data_event[dvDisplay] {
    ONLINE: {
        // SEND_COMMAND dvTP, "'^TXT-1,0,Device Connected'"
    }
    awake: {}
    standby: {}
    offline: {}
    onerror: {}
    command: {}
    STRING: {
        // STACK_VAR CHAR response[100]
        // response = DATA.TEXT

        // IF(FIND_STRING(response, 'POWERED', 1)) {
        //     primaryDevice.isPowered = TRUE
        // }
        // ELSE IF(FIND_STRING(response, 'STANDBY', 1)) {
        //     primaryDevice.isPowered = FALSE
        // }
    }
}

data_event[5001:1:0] {
    online: {}
}

data_event[DVA_DISPLAY[1]] {
    offline: {}
}

timeline_event[TL1] {}

timeline_event[TL2]
timeline_event[TL3] {

}

BUTTON_EVENT[dvTP, BTN_POWER] {
    PUSH: {
        // IF(primaryDevice.isPowered) {
        //     SEND_COMMAND dvDevice, OFF_CMD
        // }
        // ELSE {
        //     SEND_COMMAND dvDevice, ON_CMD
        // }
    }
    release: {}
    hold[1]: {}
}

BUTTON_EVENT[dvTP, BTN_VOLUME_UP] {
    PUSH: {
        // primaryDevice.volume = primaryDevice.volume + 1
        // IF(primaryDevice.volume > 100) {
        //     primaryDevice.volume = 100
        // }
        // SEND_LEVEL dvDevice, 1, primaryDevice.volume
    }
    hold[10, repeat]: {}
}

BUTTON_EVENT[dvTP, BTN_VOLUME_DOWN] {
    PUSH: {
        // primaryDevice.volume = primaryDevice.volume - 1
        // IF(primaryDevice.volume < 0) {
        //     primaryDevice.volume = 0
        // }
        // SEND_LEVEL dvDevice, 1, primaryDevice.volume
    }
    release: {}
}
