DEFINE_FUNCTION CHAR[DUET_MAX_PARAM_LEN] DuetParseCmdParam(CHAR cCmd[])
{
  STACK_VAR CHAR cTemp[DUET_MAX_PARAM_LEN]
  STACK_VAR CHAR cSep[1]
  STACK_VAR CHAR chC
  STACK_VAR INTEGER nLoop
  STACK_VAR INTEGER nState
  STACK_VAR CHAR bInquotes
  STACK_VAR CHAR bDone
  cSep = ','

  // Reset state
  nState = 1; //ST_START
  bInquotes = FALSE;
  bDone = FALSE;

  // Loop the command and escape it
  FOR (nLoop = 1; nLoop <= LENGTH_ARRAY(cCmd); nLoop++)
  {
    // Grab characters and process it based on state machine
    chC = cCmd[nLoop];
    Switch (nState)
    {
      // Start or string: end of string bails us out
      CASE 1: //ST_START
      {
        // Starts with a quote?
        // If so, skip it, set flag and move to collect.
        IF (chC == '"')
        {
          nState = 2; //ST_COLLECT
          bInquotes = TRUE;
        }

        // Starts with a comma?  Empty param
        ELSE IF (chC == ',')
        {
          // I am done
          bDone = TRUE;
        }

        // Not a quote or a comma?  Add it to the string and move to collection
        Else
        {
          cTemp = "cTemp, chC"
          nState = 2; //ST_COLLECT
        }
        BREAK;
      }

      // Collect string.
      CASE 2: //ST_COLLECT
      {
        // If in quotes, just grab the characters
        IF (bInquotes)
        {
          // Ah...found a quote, jump to end quote state
          IF (chC == '"' )
          {
            nState = 3; //ST_END_QUOTE
            BREAK;
          }
        }

        // Not in quotes, look for commas
        ELSE IF (chC == ',')
        {
          // I am done
          bDone = TRUE;
          BREAK;
        }

        // Not in quotes, look for quotes (this would be wrong)
        // But instead of barfing, I will just add the quote (below)
        ELSE IF (chC == '"' )
        {
          // I will check to see if it should be escaped
          IF (nLoop < LENGTH_ARRAY(cCmd))
          {
            // If this is 2 uqotes back to back, just include the one
            IF (cCmd[nLoop+1] = '"')
              nLoop++;
          }
        }

        // Add character to collection
        cTemp = "cTemp,chC"
        BREAK;
      }

      // End Quote
      CASE 3: //ST_END_QUOTE
      {
        // Hit a comma
        IF (chC == ',')
        {
          // I am done
          bDone = TRUE;
        }

        // OK, found a quote right after another quote.  So this is escaped.
        ELSE IF (chC == '"')
        {
          cTemp = "cTemp,chC"
          nState = 2; //ST_COLLECT
        }
        BREAK;
      }
    }

    // OK, if end of string or done, process and exit
    IF (bDone == TRUE || nLoop >= LENGTH_ARRAY(cCmd))
    {
      // remove cTemp from cCmd
      cCmd = MID_STRING(cCmd, nLoop + 1, LENGTH_STRING(cCmd) - nLoop)

      // cTemp is done
      RETURN cTemp;
    }
  }

  // Well...we should never hit this
  RETURN "";
}
