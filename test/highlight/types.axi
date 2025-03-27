STRUCTURE Person
// <- keyword
//        ^ type
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
//     ^ type
{
// <- punctuation.bracket
    char name[20];
    // <- type
    //    ^ property
    //       ^ punctuation.bracket
    //        ^ number
    //          ^ punctuation.bracket

    Person employees[10];
    // <- type
    //     ^ property
    //              ^ punctuation.bracket
    //               ^ number
    //                 ^ punctuation.bracket
};
// <- punctuation.bracket
