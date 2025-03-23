// Simple function with no return type
DEFINE_FUNCTION HelloWorld()
{
    SEND_STRING 0, 'Hello World'
}

// Function with primitive return type
DEFINE_FUNCTION INTEGER GetDeviceCount()
{
    RETURN 5
}

// Function with parameter
DEFINE_FUNCTION EnableDevice(INTEGER deviceID)
{
    LOCAL_VAR INTEGER myVar
    myVar = deviceID
}

// Function with multiple parameters
DEFINE_FUNCTION INTEGER Add(INTEGER a, INTEGER b)
{
    RETURN a + b
}

// Function with array return type
DEFINE_FUNCTION CHAR[50] GetDeviceName(DEV device)
{
    RETURN 'Device Name'
}

// Function with unbounded array return type
DEFINE_FUNCTION INTEGER[] GetValues()
{
    RETURN {1, 2, 3}
}

// Function with array parameter
DEFINE_FUNCTION CHAR ProcessCommand(CHAR buffer[])
{
    RETURN buffer[0]
}

// Function with complex array parameter
DEFINE_FUNCTION SetLevels(INTEGER levels[][2])
{
    levels[0][0] = 100
    levels[0][1] = 200
}

// Function with structured return type
DEFINE_FUNCTION DEV GetMainDevice()
{
    RETURN dvTP
}

// Function with structured parameter
DEFINE_FUNCTION InitDevice(DEV device)
{
    ON[device, 1]
}

// Function with struct parameter
DEFINE_FUNCTION ProcessAudioDevice(AudioDevice ad)
{
    // Process struct
}

// Function with multiple type qualifiers
// DEFINE_FUNCTION CONSTANT INTEGER GetMaxLevel()
// {
//     RETURN 255
// }
