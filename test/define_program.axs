PROGRAM_NAME='define_program'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
 */

DEFINE_PROGRAM {
    [dvTP, BTN_POWER] = (primaryDevice.isPowered)
}
