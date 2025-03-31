select {
    active(foo): {}
    active(bar): {}

    #IF_DEFINED FOOBAR
    active(baz): {
        #IF_DEFINED BARBAZ
        // code here
        #END_IF
    }
    #END_IF
}