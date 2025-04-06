STRUCTURE Person
// <- keyword
//        ^ type.custom
{
// <- punctuation.bracket
    char name[20];
    // <- type
    //    ^ property
    //       ^ punctuation.bracket
    //        ^ number
    //          ^ punctuation.bracket

    integer age;
    // <- type
    //      ^ property
};
// <- punctuation.bracket

struct Company
// <- keyword
//     ^ type.custom
{
// <- punctuation.bracket
    char name[20];
    // <- type
    //    ^ property
    //       ^ punctuation.bracket
    //        ^ number
    //          ^ punctuation.bracket

    Person employees[10];
    // <- type.custom
    //     ^ property
    //              ^ punctuation.bracket
    //               ^ number
    //                 ^ punctuation.bracket
};
// <- punctuation.bracket

// System types tests
TDATA event_data;
// <- type.builtin
//    ^ variable

TCHANNEL channel_data;
// <- type.builtin
//       ^ variable

TLEVEL level_data;
// <- type.builtin
//      ^ variable

TBUTTON button_data;
// <- type.builtin
//       ^ variable

TTIMELINE timeline_data;
// <- type.builtin
//         ^ variable

TCUSTOM custom_data;
// <- type.builtin
//       ^ variable

URL_STRUCT url_data;
// <- type.builtin
//         ^ variable

DNS_STRUCT dns_data;
// <- type.builtin
//         ^ variable

IP_ADDRESS_STRUCT ip_data;
// <- type.builtin
//                ^ variable

DEV_INFO_STRUCT device_data;
// <- type.builtin
//              ^ variable

CLKMGR_TIMESERVER_STRUCT timeserver;
// <- type.builtin
//                       ^ variable

DATA_FEED feed;
// <- type.builtin
//        ^ variable

DATA_FIELD field;
// <- type.builtin
//         ^ variable

DATA_RECORD record;
// <- type.builtin
//          ^ variable

WC_DATA_FEED wc_feed;
// <- type.builtin
//           ^ variable

WC_DATA_FIELD wc_field;
// <- type.builtin
//            ^ variable

WC_DATA_RECORD wc_record;
// <- type.builtin
//             ^ variable

LAST_LOGIN_INFO login_data;
// <- type.builtin
//              ^ variable
