PROGRAM_NAME='define_device'

#INCLUDE 'amx-device-control.axi'
#include 'Functions.axi'

#IF_NOT_DEFINED DEBUG_MODE
#DEFINE DEBUG_MODE
#END_IF

/**
 * This is a sample NetLinx program to test the grammar
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
