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
