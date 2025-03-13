PROGRAM_NAME='define_type'

DEFINE_TYPE

struct DeviceStatus {
    char name[50]
    char isPowered
    integer count
    long id
}

structure Person {
    char name[50]
    integer age
}

// struct Vehicle {}   // Should not parse
