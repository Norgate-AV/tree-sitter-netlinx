# tree-sitter-netlinx

[![CI][ci]](https://github.com/Norgate-AV/tree-siter-netlinx/actions/workflows/ci.yml)
[![GitHub Release](https://img.shields.io/github/v/release/Norgate-AV/tree-sitter-netlinx)](https://github.com/Norgate-AV/tree-sitter-netlinx/releases)
[![crates][crates]](https://crates.io/crates/tree-sitter-netlinx)
[![npm][npm]](https://www.npmjs.com/package/tree-sitter-netlinx)
[![pypi][pypi]](https://pypi.org/project/tree-sitter-netlinx)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![GitHub contributors](https://img.shields.io/github/contributors/Norgate-AV/tree-sitter-netlinx)](https://github.com/Norgate-AV/tree-sitter-netlinx/graphs/contributors)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

NetLinx grammar for [tree-sitter](https://tree-sitter.github.io).

[ci]: https://img.shields.io/github/actions/workflow/status/Norgate-AV/tree-sitter-netlinx/ci.yml?logo=github&label=CI
[npm]: https://img.shields.io/npm/v/tree-sitter-netlinx?logo=npm
[crates]: https://img.shields.io/crates/v/tree-sitter-netlinx?logo=rust
[pypi]: https://img.shields.io/pypi/v/tree-sitter-netlinx?logo=pypi&logoColor=ffd242

**NOTE :warning: :construction:**

This is a work in progress. Once the grammar is complete, a release will be made.

At this point the grammar is mostly complete. Work is now focused on testing and fixing any bugs.

Following that, the query files for highlights, tags, and locals still need to be finalized and tested.

## Contents :book:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Design :art:](#design-art)
    - [Permissive Parsing](#permissive-parsing)
    - [Syntax vs. Semantics](#syntax-vs-semantics)
    - [Examples of Accepted Patterns](#examples-of-accepted-patterns)
- [What's Working :white_check_mark:](#whats-working-white_check_mark)
- [Team :soccer:](#team-soccer)
- [Contributing :sparkles:](#contributing-sparkles)
- [LICENSE :balance_scale:](#license-balance_scale)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Design :art:

The grammar is designed to be as accurate as possible, while also being as flexible as possible.

### Permissive Parsing

The grammar is intentionally permissive, allowing it to parse syntactically valid but semantically questionable code. This approach enables:

- Better error recovery during editing
- A more forgiving experience during development
- The ability to parse incomplete or incorrect code
- Better syntax highlighting and code navigation

### Syntax vs. Semantics

As a parsing tool, tree-sitter focuses on syntactic structure rather than semantic validity:

- The parser will accept constructs that are syntactically correct but might fail during compilation
- Semantic validation should be handled by the NetLinx compiler or separate analysis tools
- This separation allows the grammar to be more stable and maintainable

### Examples of Accepted Patterns

The parser will accept patterns that the NetLinx compiler might reject:

- Declarations with inconsistent or incomplete type specifiers
- Mixed implicit and explicit typings
- Unusual combinations of modifiers

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
    - :white_check_mark: Device Expressions (`0:first_local_port+1:1`, `dvPort.NUMBER:dvPort.PORT:dvPort.SYSTEM`)
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
    - :white_check_mark: Devchan Operation Statements (`ON`, `OFF`, `TO`, `MIN_TO`, `PULSE`, etc)
- Declarations
    - :white_check_mark: Define Function Definitions
    - :white_check_mark: Define Library Function Declarations
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
- Comments
    - :white_check_mark: Single Line Comments
    - :white_check_mark: Multi Line Comments (C Style `/* */`)
    - :white_check_mark: Pascal Comments (`(* *)`)
- Preprocessor
    - :white_check_mark: Define
    - :white_check_mark: Include
    - :white_check_mark: Warn
    - :white_check_mark: Disable Warning
    - :white_check_mark: If Defined
    - :white_check_mark: If Not Defined
- :x: Other bits that I haven't thought of yet or have forgotten about

## Team :soccer:

This project is maintained by the following person(s) and a bunch of [awesome contributors](https://github.com/Norgate-AV/tree-sitter-netlinx/graphs/contributors).

<table>
  <tr>
    <td align="center"><a href="https://github.com/damienbutt"><img src="https://avatars.githubusercontent.com/damienbutt?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damien Butt</b></sub></a><br /></td>
  </tr>
</table>

## Contributing :sparkles:

Contributions are welcome! Please fork and open a pull request if you have any suggestions or improvements.

Any help would be greatly appreciated.

## LICENSE :balance_scale:

[MIT](./LICENSE)
