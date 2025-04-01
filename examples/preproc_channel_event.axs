channel_event[dvTP, 1]
#IF_DEFINED FOO
channel_event[dvTP, 2]
#END_IF
{
    on: {}

    #IF_NOT_DEFINED BAR
    off: {}
    #END_IF
}
