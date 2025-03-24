# tree-sitter-netlinx

[![CI][ci]](https://github.com/Norgate-AV/tree-siter-netlinx/actions/workflows/ci.yml)
[![crates][crates]](https://crates.io/crates/tree-sitter-netlinx)
[![npm][npm]](https://www.npmjs.com/package/tree-sitter-netlinx)
[![pypi][pypi]](https://pypi.org/project/tree-sitter-netlinx)

NetLinx grammar for [tree-sitter](https://tree-sitter.github.io).

[ci]: https://img.shields.io/github/actions/workflow/status/Norgate-AV/tree-sitter-netlinx/ci.yml?logo=github&label=CI
[npm]: https://img.shields.io/npm/v/tree-sitter-netlinx?logo=npm
[crates]: https://img.shields.io/crates/v/tree-sitter-netlinx?logo=rust
[pypi]: https://img.shields.io/pypi/v/tree-sitter-netlinx?logo=pypi&logoColor=ffd242

**NOTE :warning: :construction:**

This is a work in progress. Once the grammar is complete, a release will be made.

At this point the grammar is mostly complete. Work is now focused on testing and fixing any bugs.

Following that, the query files for highlights, tags, and locals still need to be finalized and tested.

## What's Working :white_check_mark:

- Expressions
    - :white_check_mark: Binary Expressions
    - :white_check_mark: Bitwise Expressions
    - :white_check_mark: Unary Expressions
    - :white_check_mark: Update Expressions
    - :white_check_mark: Assignment Expressions
    - :white_check_mark: Devchan Expressions
    - :white_check_mark: Devchan Range Expressions
    - :white_check_mark: Comparison Expressions
    - :white_check_mark: Logical Expressions
    - :white_check_mark: String Expressions
    - :white_check_mark: Function Call Expressions
- Statements
    - :white_check_mark: If Statements
    - :white_check_mark: While Loops
    - :white_check_mark: For Loops
    - :white_check_mark: Switch/Case Statements
    - :white_check_mark: Select/Active Statements
    - :white_check_mark: Create Buffer Statements
    - :white_check_mark: Create Multi Buffer Statements
    - :white_check_mark: Clear Buffer Statements
    - :white_check_mark: Wait Statements
    - :white_check_mark: Wait Until Statements
    - :white_check_mark: Cancel Wait Statements
    - :white_check_mark: Cancel Wait Until Statements
    - :white_check_mark: Cancel All Wait Statements
    - :white_check_mark: Cancel All Wait Until Statements
    - :white_check_mark: Break Statements
    - :white_check_mark: Section Statements
    - :white_check_mark: Program Name
    - :white_check_mark: Module Name
    - :white_check_mark: Send String Statements
    - :white_check_mark: Send Command Statements
    - :white_check_mark: Send Level Statements
    - :white_check_mark: Devchan Operation Statements (ON, OFF, TO, MIN_TO, PULSE, etc)
- Declarations
    - :white_check_mark: Define Function Definitions
    - :white_check_mark: Define Call Definitions
    - :white_check_mark: Variable Declarations
    - :white_check_mark: Constants Declarations
    - :white_check_mark: Type Declarations
    - :white_check_mark: Module Definitions
    - :white_check_mark: Combine Definitions
    - :white_check_mark: Connect Level Definitions
    - :white_check_mark: Toggling Definitions
    - :white_check_mark: Mutually Exclusive Definitions
- Events
    - :white_check_mark: Button Events
    - :white_check_mark: Channel Events
    - :white_check_mark: Level Events
    - :white_check_mark: Data Events
    - :white_check_mark: Timeline Events
    - :white_check_mark: Custom Events
- Literals
    - :white_check_mark: String Literals
    - :white_check_mark: Number Literals
    - :white_check_mark: Device Literals
    - :white_check_mark: Arrays
- Comments
    - :white_check_mark: Single Line Comments
    - :white_check_mark: Multi Line Comments
    - :white_check_mark: Pascal Comments
- Preprocessor
    - :white_check_mark: Define
    - :white_check_mark: Include
    - :white_check_mark: Warn
    - :white_check_mark: Disable Warning
    - :white_check_mark: If Defined
    - :white_check_mark: If Not Defined
- :x: Other bits that I haven't thought of yet or have forgotten about

## Contributing :sparkles:

Contributions are welcome! Please fork and open a pull request if you have any suggestions or improvements.

Any help would be greatly appreciated.

## LICENSE :balance_scale:

[MIT](./LICENSE)
