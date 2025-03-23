DEFINE_FUNCTION CHAR[50] GetDeviceName(DEV device) {
    RETURN 'Device'
  }

DEFINE_FUNCTION INTEGER[] GetValues() {
    RETURN {1, 2, 3}
}

// Functions manipulating arrays
DEFINE_FUNCTION SortArray(INTEGER array[]) {
    INTEGER i, j, temp
    // Array operations in function body
    array[0] = 42
}
