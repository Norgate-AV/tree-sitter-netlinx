constant integer FOO[]    =   {
    #IF_DEFINED BAR
    baz
    #END_IF

    #IF_DEFINED foobar
    ,
    bar
    #END_IF

    #IF_DEFINED BAZ
    ,
    foo
    #END_IF
}
