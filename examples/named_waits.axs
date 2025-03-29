// Named wait statements
WAIT 500 'PowerSequence'
WAIT_UNTIL(powerState) 'PowerCheck'

// Cancel wait statements
CANCEL_WAIT 'PowerSequence'
CANCEL_WAIT_UNTIL 'PowerCheck'

// Cancel all waits
CANCEL_ALL_WAIT
CANCEL_ALL_WAIT_UNTIL

// Wait with dynamic expression
WAIT timeout * multiplier 'DynamicWait'
CANCEL_WAIT 'DynamicWait'
