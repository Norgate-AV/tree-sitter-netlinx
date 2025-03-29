// DevChan range operations
ON [dvTP, 1]..[dvTP, 10]
OFF [dvTP, 11]..[dvTP, 20]
TO [dvTP, 21]..[dvTP, 30]

// Complex range operations
ON [dv[i], ch[j]]..[dv[i+5], ch[j+10]]
PULSE [devices[1], startChannel]..[devices[1], endChannel]
