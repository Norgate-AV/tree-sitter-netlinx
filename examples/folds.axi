// Test file for folding
define_function integer MyFunction() {
    if (x == 1) {
        // This block should fold
        DoSomething();
        DoSomethingElse();
    }

    while (condition) {
        // This should also fold
        statements;
    }

    /* This multi-line comment
       should be foldable
       as well */
}
