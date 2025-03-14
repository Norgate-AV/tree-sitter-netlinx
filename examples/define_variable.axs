PROGRAM_NAME='define_variable'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
 */

DEFINE_VARIABLE

VOLATILE DeviceStatus primaryDevice
VOLATILE INTEGER powerState
VOLATILE CHAR buffer[1024]
