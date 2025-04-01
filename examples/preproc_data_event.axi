data_event[dvTP1]
#IF_DEFINED FOO
data_event[dvTP2]
#END_IF
{
    online: {}

    #IF_NOT_DEFINED BAR
    string: {}
    command: {}
    #END_IF
}
