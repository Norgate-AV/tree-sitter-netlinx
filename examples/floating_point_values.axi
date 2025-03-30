// Basic floating point values
x = 3.14
y = -2.5
z = +0.75

// Scientific notation
sci1 = 1.25e3
sci2 = 4.56E2
sci3 = 7.89e+10
sci4 = 1.23E-4

// Edge cases
edge1 = .5        // No leading digit
edge2 = 5.        // No trailing digits
edge3 = 0.0
edge4 = 123.456
edge5 = -.75      // Negative with no leading digit
edge6 = +.25      // Positive with no leading digit

// Float in expressions
result1 = 1.5 + 2.5
result2 = 10.0 / 2.0
result3 = 3.0 * 1.5
result4 = 5.75 - 2.25

// Float in function calls
SetLevel(vdvDevice, 1, 0.75)
AdjustVolume(dvAudio, -1.5)
CalculateOffset(3.14159, 2.71828)

// Float in declarations
DEFINE_VARIABLE
float pi = 3.14159
double e = 2.71828
float values[] = {1.1, 2.2, 3.3, 4.4}
