button_event[dvTP, 1]
#IF_DEFINED FOO
button_event[dvTP, 2]
#END_IF
{
    push: {}

    #IF_NOT_DEFINED BAR
    release: {}
    #END_IF
}
