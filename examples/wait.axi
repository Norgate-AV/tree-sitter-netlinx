wait 1 foo()
wait 2 {
    bar()
}

wait (timeout * 10) 'Timeout' {
    baz()
}

wait 1 'MyWait' Foo()

wait 1
wait 2
wait 1 'MyWait'

cancel_wait 'MyWait'
cancel_all_wait
wait (timeout * 10) 'Timeout'
wait timeout * 10 'Timeout'
WAIT timeout * multiplier 'DynamicWait'
WAIT timeout * multiplier 'DynamicWait'
