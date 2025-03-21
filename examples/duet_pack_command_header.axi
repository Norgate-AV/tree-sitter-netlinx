DEFINE_FUNCTION CHAR[DUET_MAX_HDR_LEN] DuetPackCmdHeader(CHAR cHdr[])
{
  STACK_VAR CHAR cSep[1]
  cSep = '-'

  IF (RIGHT_STRING(cHdr,LENGTH_STRING(cSep)) != cSep)
      RETURN "cHdr,cSep";

  RETURN cHdr;
}
