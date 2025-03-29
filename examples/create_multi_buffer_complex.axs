// Simple multi buffer
CREATE_MULTI_BUFFER dvTP1, dvTP2, BUFFER

// Complex multi buffer expressions
CREATE_MULTI_BUFFER devices[currentIndex], BUFFER[i+1], MakeDevice(5001)
CREATE_BUFFER someDevice, GetBuffer(index), bufferSize * 2

// Clear buffer operations
CLEAR_BUFFER BUFFER
CLEAR_BUFFER dynamicBuffer[currentIndex]
