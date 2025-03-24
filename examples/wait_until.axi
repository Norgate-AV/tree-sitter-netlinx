wait_until (foo == true) bar()
wait_until (bar == false) {
    baz()
}

wait_until (volume > 50) 'VolumeWait' {
    foo()
}
