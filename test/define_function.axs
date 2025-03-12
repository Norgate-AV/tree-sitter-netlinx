PROGRAM_NAME='define_variable'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
 */

DEFINE_FUNCTION CHAR[100] FormatStatus(DeviceStatus status) {
	// STACK_VAR CHAR result[100]

	// // A "String Expression", or more widely known as "String Interpolation"
	// result = "'Device: ', status.name, 'Power: ', ITOA(status.isPowered), 'Volume: ', ITOA(status.volume)"

	RETURN ''
}

