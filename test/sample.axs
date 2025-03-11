PROGRAM_NAME='Sample NetLinX Program'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinX program to test the grammar
 */

DEFINE_DEVICE

// Sockets
dvDSP                   =       0:3:0       // Extron DMP128
dvSSP                   =       0:4:0       // Extron SSP-200

// Serial
dvDisplay               =       5001:1:0    // Panasonic Projector
dvSwitcher              =       5001:2:0    // Extron IN1806

// Relays
dvRelays                =       5001:21:0

// I/O
dvIO                    =       5001:22:0

// Touch Panels
dvTP                    =       10001:1:0   // Touch panel

// Virtual Devices
vdvDisplay              =       33201:1:0
vdvDSP                  =       33202:1:0
vdvSSP                  =       33203:1:0
vdvSwitcher             =       33204:1:0


DEFINE_CONSTANT

INTEGER BTN_POWER = 1
INTEGER BTN_VOLUME_UP = 2
INTEGER BTN_VOLUME_DOWN = 3
CHAR ON_CMD[] = 'PWR-ON'
CHAR OFF_CMD[] = 'PWR-OFF'

NAV_MAX_CHARS = 50

/////////////////////////////////////////////////////////////
// Room Defs
/////////////////////////////////////////////////////////////
constant sinteger ROOM_START_UP_SHUT_DOWN_TIMES[]    = { 90, 10 }


/////////////////////////////////////////////////////////////
// Timeline Defs
/////////////////////////////////////////////////////////////
constant long TL_START_UP       = 1
constant long TL_SHUT_DOWN      = 2

constant long TL_POWER_CYCLE_INTERVAL[] = { 100 }


/////////////////////////////////////////////////////////////
// Relay Defs
/////////////////////////////////////////////////////////////
constant integer RELAY_SCREEN_DOWN  = 1
constant integer RELAY_SCREEN_UP    = 2


/////////////////////////////////////////////////////////////
// IO Defs
/////////////////////////////////////////////////////////////
constant integer IO_FIRE_ALARM    = 1


/////////////////////////////////////////////////////////////
// Source Defs
/////////////////////////////////////////////////////////////
constant integer SOURCE_LAPTOP      = 1
constant integer SOURCE_DOC_CAM     = 2
constant integer SOURCE_PC          = 3
constant integer SOURCE_WIRELESS    = 4

constant char SOURCE_NAME[][NAV_MAX_CHARS]  =   {
	'Laptop',
	'Visualiser',
	'PC',
	'BYOD'
}

constant integer SOURCE_DEFAULT     = SOURCE_PC

constant integer SOURCE_LAPTOP_1    = 1
constant integer SOURCE_LAPTOP_2    = 2

constant integer SOURCE_LAPTOP_DEFAULT = SOURCE_LAPTOP_1


/////////////////////////////////////////////////////////////
// Display Defs
/////////////////////////////////////////////////////////////
constant integer NUMBER_OF_DISPLAYS    = 1
constant integer DISPLAY_1             = 1

constant dev DVA_DISPLAYS[]    =    {
	vdvDisplay_1
}

constant char DISPLAY_INPUT_FOR_SOURCE[][NAV_MAX_CHARS]    =    {
	'DIGITAL_LINK,1',
	'DIGITAL_LINK,1',
	'DIGITAL_LINK,1',
	'DIGITAL_LINK,1'
}


/////////////////////////////////////////////////////////////
// Repeater Defs
/////////////////////////////////////////////////////////////
constant integer NUMBER_OF_REPEATERS    = 2
constant integer REPEATER_1             = 1
constant integer REPEATER_2             = 2

constant integer REPEATER_MODE_LECTERN      = 1
constant integer REPEATER_MODE_LOCAL_HDMI   = 2
constant integer REPEATER_MODE_LOCAL_VGA    = 3

constant dev DVA_REPEATERS[]    =   {
	vdvRepeater_1,
	vdvRepeater_2
}

constant char REPEATER_INPUT_FOR_SOURCE[][NAV_MAX_CHARS]    =   {
	'HDMI,1',
	'HDMI,1',
	'HDMI,1',
	'HDMI,1'
}

constant char REPEATER_IP_PORT_FOR_REPEATER[][NAV_MAX_CHARS]    =   {
	'2002',
	'2003'
}


/////////////////////////////////////////////////////////////
// Switcher Defs
/////////////////////////////////////////////////////////////
constant integer SWITCHER_INPUT_FOR_SOURCE[]    =   { 00, 00, 04, 00 }

constant integer SWITCHER_INPUT_FOR_SOURCE_LAPTOP[] = { 03, 02 }

constant integer SWITCHER_INPUT_MATRIX      = 01

constant integer SWITCHER_OUTPUT_MAIN       = 01
constant integer SWITCHER_OUTPUT_MONITOR    = 02
constant integer SWITCHER_OUTPUTS[][]   =   {
	{ 01, 02 },
	{ 01 }
}


/////////////////////////////////////////////////////////////
// Matrix Defs
/////////////////////////////////////////////////////////////
constant dev DVA_MATRIX[]    =  {
	dvMatrix_Port_1,
	dvMatrix_Port_2,
	dvMatrix_Port_3,
	dvMatrix_Port_4,
	dvMatrix_Port_5,
	dvMatrix_Port_6,
	dvMatrix_Port_7,
	dvMatrix_Port_8,
	dvMatrix_Port_9,
	dvMatrix_Port_10,
	dvMatrix_Port_11,
	dvMatrix_Port_12,
	dvMatrix_Port_13,
	dvMatrix_Port_14
}

constant integer MATRIX_INPUT_FOR_SOURCE[][]    =   {
	{ 01, 02, 01, 03 },
	{ 01, 02, 01, 03 }
}

constant integer MATRIX_INPUT_FOR_SOURCE_LAPTOP[][]    =    {
	{ 01, 01 },
	{ 01, 01 }
}


constant integer MATRIX_VID_OUTPUT_LECTURE_CAPTURE      = 1
constant integer MATRIX_VID_OUTPUT_MONITOR_LOOPBACK     = 2
constant integer MATRIX_VID_OUTPUT_DISPLAY              = 3
constant integer MATRIX_VID_OUTPUT_REPEATERS            = 4
constant integer MATRIX_AUD_OUTPUT_DSP      = 1
constant integer MATRIX_AUD_OUTPUT_PROGRAM  = 2
constant integer MATRIX_AUD_OUTPUT_PATCH    = 3
constant integer MATRIX_AUD_OUTPUT_DANTE    = 4
constant integer MATRIX_OUTPUTS[][]    =    {
	{ 01, 02, 03, 04 },
	{ 01, 02, 03, 04 }
}

constant integer MATRIX_MONITOR_SOURCE_FOR_SOURCE[]    = { 07, 07, 07, 08, 07 }

constant integer MATRIX_VIDEO_OUT_MUTE_CHANNEL = 210


/////////////////////////////////////////////////////////////
// TP Defs
/////////////////////////////////////////////////////////////
constant dev DVA_TP_MAIN[]      = { dvTP_Main }
constant dev DVA_TP_DOC_CAM[]   = { dvTP_Doc_Cam }
constant dev DVA_TP_CAMERA[]    = { dvTP_Camera }


/////////////////////////////////////////////////////////////
// Page Defs
/////////////////////////////////////////////////////////////
constant integer PAGE_LOGO              = 1
constant integer PAGE_MAIN              = 2
constant integer PAGE_STARTING_UP       = 3
constant integer PAGE_SHUTTING_DOWN     = 4
constant char PAGE_NAMES[][NAV_MAX_CHARS]   =   {
	'Logo',
	'Main',
	'Starting Up',
	'Shutting Down'
}

// DEFINE_TYPE
// STRUCTURE DeviceStatus {
// 	CHAR name[50]
// 	INTEGER isPowered
// 	INTEGER volume
// }

// DEFINE_VARIABLE
// VOLATILE DeviceStatus primaryDevice
// VOLATILE INTEGER powerState
// VOLATILE CHAR buffer[1024]

// DEFINE_FUNCTION CHAR[100] FormatStatus(DeviceStatus status) {
// 	STACK_VAR CHAR result[100]

// 	// A "String Expression", or more widely known as "String Interpolation"
// 	result = "'Device: ', status.name, 'Power: ', ITOA(status.isPowered), 'Volume: ', ITOA(status.volume)"

// 	RETURN result
// }

// DEFINE_START {
// 	primaryDevice.name = 'Main Display'
// 	primaryDevice.isPowered = FALSE
// 	primaryDevice.volume = 50
// }

// DEFINE_EVENT
// DATA_EVENT[dvDevice] {
// 	ONLINE: {
// 		SEND_COMMAND dvTP, "'^TXT-1,0,Device Connected'"
// 	}
// 	STRING: {
// 		STACK_VAR CHAR response[100]
// 		response = DATA.TEXT

// 		IF(FIND_STRING(response, 'POWERED', 1)) {
// 			primaryDevice.isPowered = TRUE
// 		}
// 		ELSE IF(FIND_STRING(response, 'STANDBY', 1)) {
// 			primaryDevice.isPowered = FALSE
// 		}
// 	}
// }

// BUTTON_EVENT[dvTP, BTN_POWER] {
// 	PUSH: {
// 		IF(primaryDevice.isPowered) {
// 			SEND_COMMAND dvDevice, OFF_CMD
// 		}
// 		ELSE {
// 			SEND_COMMAND dvDevice, ON_CMD
// 		}
// 	}
// }

// BUTTON_EVENT[dvTP, BTN_VOLUME_UP] {
// 	PUSH: {
// 		primaryDevice.volume = primaryDevice.volume + 1
// 		IF(primaryDevice.volume > 100) {
// 			primaryDevice.volume = 100
// 		}
// 		SEND_LEVEL dvDevice, 1, primaryDevice.volume
// 	}
// }

// BUTTON_EVENT[dvTP, BTN_VOLUME_DOWN] {
// 	PUSH: {
// 		primaryDevice.volume = primaryDevice.volume - 1
// 		IF(primaryDevice.volume < 0) {
// 			primaryDevice.volume = 0
// 		}
// 		SEND_LEVEL dvDevice, 1, primaryDevice.volume
// 	}
// }

// DEFINE_PROGRAM {
// 	[dvTP, BTN_POWER] = (primaryDevice.isPowered)
// }










