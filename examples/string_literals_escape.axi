'This is a ''quoted'' word in a string'
'Don''t forget this syntax'

// Basic single quote escaping
message = 'This isn''t a problem'
query = 'SQL Query: SELECT * FROM ''Users'''
empty = ''
singleQuote = ''''

// Multiple escaped quotes
text = 'She said, ''Hello,'' and then ''Goodbye'''

// Quotes at edges
edgeCase = '''Start'' and ''End'''

// Only escaped quotes
onlyEscaped = ''''''
