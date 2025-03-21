DEFINE_FUNCTION CHAR[DUET_MAX_CMD_LEN] DuetPackCmdParam(CHAR cCmd[], CHAR cParam[])
{
  STACK_VAR CHAR cTemp[DUET_MAX_CMD_LEN]
  STACK_VAR CHAR cTempParam[DUET_MAX_CMD_LEN]
  STACK_VAR CHAR cCmdSep[1]
  STACK_VAR CHAR cParamSep[1]
  STACK_VAR INTEGER nLoop
  cCmdSep = '-'
  cParamSep = ','

  // Not the first param?  Add the param separator
  cTemp = cCmd
  IF (FIND_STRING(cCmd,cCmdSep,1) != (LENGTH_STRING(cCmd)-LENGTH_STRING(cCmdSep)+1))
    cTemp = "cTemp,cParamSep"

  // Escape any quotes
  FOR (nLoop = 1; nLoop <= LENGTH_ARRAY(cParam); nLoop++)
  {
    IF (cParam[nLoop] == '"')
      cTempParam = "cTempParam,'"'"
    cTempParam = "cTempParam,cParam[nLoop]"
  }

  // Add the param, wrapped in double-quotes if needed
  IF (FIND_STRING(cTempParam,cParamSep,1) > 0)
      cTemp = "cTemp,'"',cTempParam,'"'"
  ELSE
      cTemp = "cTemp,cTempParam"

  RETURN cTemp;
}
