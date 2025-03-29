// Function with compound statement in parameters
DEFINE_FUNCTION INTEGER Process(INTEGER count)
{
    RunCallback({
        SendCommand(dvDevice, 'INIT')
        WAIT 10
        SendCommand(dvDevice, 'START')
    })

    SendWithHandler(dvDevice, 'STATUS', {
        // Process response
        result = DATA.TEXT
        UpdateState(result)
    })

    RETURN 1
}
