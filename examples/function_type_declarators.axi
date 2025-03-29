// Basic function type
DEFINE_FUNCTION INTEGER GetCalculator()
{
    RETURN 0
}

// Using function references
INTEGER calculator
calculator = GetCalculator()

// Dynamic function calls
(calculator)(5, 10)
