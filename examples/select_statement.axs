DEFINE_START

SELECT {
    ACTIVE(btnMode == MODE_NORMAL): {
        processNormal()
    }
    ACTIVE(btnMode == MODE_ADMIN): {
        processAdmin()
    }
}
