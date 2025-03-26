#IF_DEFINED ENABLE_SPECIAL_FUNCTIONS
DEFINE_FUNCTION integer GetSpecialValue(integer param)
{
    RETURN param * 2 + SPECIAL_FACTOR
}

#IF_DEFINED INCLUDE_HELPERS
DEFINE_FUNCTION char[50] FormatSpecialValue(integer val)
{
    RETURN "'Special: ', ITOA(val)"
}
#END_IF

#ELSE
DEFINE_FUNCTION integer GetSpecialValue(integer param)
{
    RETURN param
}
#END_IF
