// Structure with preprocessor directives
DEFINE_TYPE
STRUCTURE ConfigOptions {
  INTEGER version

  #IF_DEFINED EXTENDED_FEATURES
  INTEGER extendedFeatures[10]
  INTEGER extendedFlag
  #ELSE
  INTEGER basicFeatures
  #END_IF

  CHAR label[20]
}
