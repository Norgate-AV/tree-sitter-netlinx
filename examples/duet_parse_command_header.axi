DEFINE_FUNCTION CHAR[DUET_MAX_HDR_LEN] DuetParseCmdHeader(CHAR cCmd[])
{
  STACK_VAR CHAR cTemp[DUET_MAX_HDR_LEN]
  STACK_VAR CHAR cSep[1]
  cSep = '-'

  // Assume the argument to be the command
  cTemp = cCmd

  // If we find the seperator, remove it from the command
  IF (FIND_STRING(cCmd,cSep,1) > 0)
  {
    cTemp = REMOVE_STRING(cCmd,cSep,1)
    IF (LENGTH_STRING(cTemp))
      cTemp = LEFT_STRING(cTemp,LENGTH_STRING(cTemp)-LENGTH_STRING(cSep))
  }

  // Did not find seperator, argument is the command (like ?SOMETHING)
  ELSE
    cCmd = ""

  RETURN cTemp;
}
