PROGRAM_NAME='define_start'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
 */

DEFINE_START {
    primaryDevice.name = 'Main Display'
    primaryDevice.isPowered = FALSE
    primaryDevice.volume = 50
}
