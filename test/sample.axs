PROGRAM_NAME='Sample NetLinX Program'

#INCLUDE 'amx-device-control.axi'
#DEFINE DEBUG_MODE

/*
 * This is a sample NetLinX program to test the grammar
 */

DEFINE_DEVICE
dvTP = 10001:1:0            // Touch panel
dvDevice = 5001:1:0         // Controlled device
vdvSystem = 33000:1:0       // Virtual device

DEFINE_CONSTANT
INTEGER BTN_POWER = 1
INTEGER BTN_VOLUME_UP = 2
INTEGER BTN_VOLUME_DOWN = 3
CHAR ON_CMD[] = 'PWR-ON'
CHAR OFF_CMD[] = 'PWR-OFF'

DEFINE_TYPE
STRUCTURE DeviceStatus {
    CHAR name[50]
    INTEGER isPowered
    INTEGER volume
}

DEFINE_VARIABLE
VOLATILE DeviceStatus primaryDevice
VOLATILE INTEGER powerState
VOLATILE CHAR buffer[1024]

DEFINE_FUNCTION CHAR[100] FormatStatus(DeviceStatus status) {
    STACK_VAR CHAR result[100]

    result = "'Device: ', status.name, 'Power: ', ITOA(status.isPowered), 'Volume: ', ITOA(status.volume)"

    RETURN result
}

DEFINE_START {
    primaryDevice.name = 'Main Display'
    primaryDevice.isPowered = FALSE
    primaryDevice.volume = 50
}

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

DEFINE_PROGRAM {
    [dvTP, BTN_POWER] = (primaryDevice.isPowered)
}
