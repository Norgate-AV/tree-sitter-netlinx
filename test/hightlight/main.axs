PROGRAM_NAME='main'

// Devices
DEFINE_DEVICE

dvDisplay_1         =   5001:1:0;
dvDisplay_2         =   5001:2:0;
dvSwitcher          =   5001:3:0


(* Touch Panels *)
dvTP1               =   10001:1:0
dvTP2               =   10002:1:0;


/* Combines */
// define_combine
// (dvTP1,dvTP2)


DEFINE_CONSTANT

constant integer DISPLAY_1 = 1;
integer DISPLAY_2 = 2
SWITCHER_IP_ADDRESS = '192.168.100.21';
char DISPLAY_1_IP_ADDRESS[] = '192.168.100.22'
constant char DISPLAY_2_IP_ADDRESS[15] = '192.168.100.23';

integer DEFAULT_DISPLAY = DISPLAY_1;
NUMBER_OF_DISPLAYS = (1 * 2)
