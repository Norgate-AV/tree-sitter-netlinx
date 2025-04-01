constant integer FOO[] = {
    1,
    2,
    #IF_NOT_DEFINED BAR
    3,
    3,
    #END_IF
    4,
    5
    #IF_DEFINED BAZ
    ,
    6
    #END_IF
}
