constant char FOO[][50]     =   {
    #IF_DEFINED BAR
    'foo',
    'foo',
    'foo',
    'foo',
    'foo',
    'foo'
    #END_IF

    #IF_DEFINED BAZ
    'bar',
    'bar',
    'bar',
    'bar',
    'bar',
    'bar'
    #END_IF
}
