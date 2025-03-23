STRUCTURE DeviceStatus {
    CHAR name[50]
    INTEGER isPowered
    INTEGER volume
}

struct Person {
    char name[50]
    integer age
}

STRUCT UserConfig {
    CHAR username[50]
    INTEGER accessLevel
    DeviceStatus devices[10]
}
