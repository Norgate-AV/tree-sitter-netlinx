DEFINE_FUNCTION CHAR[DUET_MAX_CMD_LEN] DuetPackCmdParamArray(CHAR cCmd[], CHAR cParams[][])
{
  STACK_VAR CHAR    cTemp[DUET_MAX_CMD_LEN]
  STACK_VAR INTEGER nLoop
  STACK_VAR INTEGER nMax
  STACK_VAR CHAR cCmdSep[1]
  STACK_VAR CHAR cParamSep[1]
  cCmdSep = '-'
  cParamSep = ','

  nMax = LENGTH_ARRAY(cParams)
  IF (nMax == 0)
    nMax = MAX_LENGTH_ARRAY(cParams)

  cTemp = cCmd
  FOR (nLoop = 1; nLoop <= nMax; nLoop++)
    cTemp = DuetPackCmdParam(cTemp,cParams[nLoop])

  RETURN cTemp;
}
