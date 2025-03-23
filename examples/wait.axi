wait 1 foo()
wait 2 {
    bar()
}

wait (timeout * 10) 'Timeout' {
    baz()
}
