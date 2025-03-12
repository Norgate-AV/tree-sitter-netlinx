PROGRAM_NAME='define_type'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
 */

DEFINE_TYPE

STRUCTURE DeviceStatus {
	CHAR name[50]
	INTEGER isPowered
	INTEGER volume
}

struct MyStruct {
	char name[50]
	integer isPowered
	integer volume
}
