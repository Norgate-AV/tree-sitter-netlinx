DEFINE_FUNCTION CHAR[DUET_MAX_CMD_LEN] DuetPackCmdSimple(CHAR cHdr[], CHAR cParam[])
{
  STACK_VAR CHAR cCmd[DUET_MAX_CMD_LEN]

  cCmd = DuetPackCmdHeader(cHdr)
  cCmd = DuetPackCmdParam(cCmd,cParam)
  RETURN cCmd;
}
