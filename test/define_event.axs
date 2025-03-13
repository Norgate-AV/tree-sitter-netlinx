PROGRAM_NAME='define_event'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
 */

DEFINE_EVENT

DATA_EVENT[dvDevice] {
    ONLINE: {
        SEND_COMMAND dvTP, "'^TXT-1,0,Device Connected'"
    }
    STRING: {
        STACK_VAR CHAR response[100]
        response = DATA.TEXT

        IF(FIND_STRING(response, 'POWERED', 1)) {
            primaryDevice.isPowered = TRUE
        }
        ELSE IF(FIND_STRING(response, 'STANDBY', 1)) {
            primaryDevice.isPowered = FALSE
        }
    }
}

BUTTON_EVENT[dvTP, BTN_POWER] {
    PUSH: {
        IF(primaryDevice.isPowered) {
            SEND_COMMAND dvDevice, OFF_CMD
        }
        ELSE {
            SEND_COMMAND dvDevice, ON_CMD
        }
    }
}

BUTTON_EVENT[dvTP, BTN_VOLUME_UP] {
    PUSH: {
        primaryDevice.volume = primaryDevice.volume + 1
        IF(primaryDevice.volume > 100) {
            primaryDevice.volume = 100
        }
        SEND_LEVEL dvDevice, 1, primaryDevice.volume
    }
}

BUTTON_EVENT[dvTP, BTN_VOLUME_DOWN] {
    PUSH: {
        primaryDevice.volume = primaryDevice.volume - 1
        IF(primaryDevice.volume < 0) {
            primaryDevice.volume = 0
        }
        SEND_LEVEL dvDevice, 1, primaryDevice.volume
    }
}
