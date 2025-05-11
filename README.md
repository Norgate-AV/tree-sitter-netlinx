# tree-sitter-netlinx

<div align="center">
    <img align="center" style="margin-right: 10px;" src="./assets/img/Tree-sitter1.png" alt="tree-sitter-logo" width="150" hspace="10" />
    <!-- <span>-----</span> -->
    <img align="center" style="margin-left: 10px;" src="./assets/img/NetLinx1.png" alt="netlinx-logo" width="150" hspace="10"/>
</div>

---

[![CI][ci]](https://github.com/Norgate-AV/tree-sitter-netlinx/actions/workflows/ci.yml)
[![GitHub Release](https://img.shields.io/github/v/release/Norgate-AV/tree-sitter-netlinx)](https://github.com/Norgate-AV/tree-sitter-netlinx/releases)
[![crates][crates]](https://crates.io/crates/tree-sitter-netlinx)
[![npm][npm]](https://www.npmjs.com/package/tree-sitter-netlinx)
[![pypi][pypi]](https://pypi.org/project/tree-sitter-netlinx)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![GitHub contributors](https://img.shields.io/github/contributors/Norgate-AV/tree-sitter-netlinx)](https://github.com/Norgate-AV/tree-sitter-netlinx/graphs/contributors)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[NetLinx](https://pldb.io/concepts/netlinx.html) grammar for [tree-sitter](https://tree-sitter.github.io).

[ci]: https://img.shields.io/github/actions/workflow/status/Norgate-AV/tree-sitter-netlinx/ci.yml?logo=github&label=CI
[npm]: https://img.shields.io/npm/v/tree-sitter-netlinx?logo=npm
[crates]: https://img.shields.io/crates/v/tree-sitter-netlinx?logo=rust
[pypi]: https://img.shields.io/pypi/v/tree-sitter-netlinx?logo=pypi&logoColor=ffd242

## Contents :book:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What's Working :white_check_mark:](#whats-working-white_check_mark)
- [Known Limitations :warning:](#known-limitations-warning)
    - [Preprocessor Directives in Expressions](#preprocessor-directives-in-expressions)
- [Install :zap:](#install-zap)
    - [Node.js (npm)](#nodejs-npm)
    - [Rust (Cargo)](#rust-cargo)
    - [Python (pip)](#python-pip)
    - [Nix](#nix)
    - [Manual Installation](#manual-installation)
- [Design :art:](#design-art)
    - [Permissive Parsing](#permissive-parsing)
    - [Syntax vs. Semantics](#syntax-vs-semantics)
    - [Examples of Accepted Patterns](#examples-of-accepted-patterns)
    - [Flexibility Over Semantic Correctness](#flexibility-over-semantic-correctness)
- [References :book:](#references-book)
- [Team :soccer:](#team-soccer)
- [Contributors :sparkles:](#contributors-sparkles)
- [LICENSE :balance_scale:](#license-balance_scale)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What's Working :white_check_mark:

- Expressions
    - :white_check_mark: Binary Expressions
    - :white_check_mark: Bitwise Expressions
    - :white_check_mark: Bitwise Word Expressions (`band`, `bor`, `bxor`, `bnot`, `lshift`, `rshift`)
    - :white_check_mark: Unary Expressions
    - :white_check_mark: Update Expressions
    - :white_check_mark: Assignment Expressions
    - :white_check_mark: Devchan Expressions
    - :white_check_mark: Devchan Range Expressions
    - :white_check_mark: Comparison Expressions
    - :white_check_mark: Logical Expressions
    - :white_check_mark: Logical Word Expressions (`and`, `or`, `xor`, `not`)
    - :white_check_mark: String Expressions
    - :white_check_mark: Function Call Expressions
    - :white_check_mark: Device Expressions (`0:first_local_port+1:1`, `dvPort.NUMBER:dvPort.PORT:dvPort.SYSTEM`)
    - :white_check_mark: Parenthesized Expressions
    - :white_check_mark: Subscript Expressions
    - :white_check_mark: Comma Expressions
    - :white_check_mark: Compiler Variables (`__file__`, `__line__`, `__date__`, `__time__`, etc)
    - :white_check_mark: System Variables (`day`, `date`, `ldate`, `time`, etc)
    - :white_check_mark: System Constants (`true`, `false`, etc)
    - :white_check_mark: System Functions (all functions defined in `NetLinx.axi`)
    - :white_check_mark: System Types (all types defined in `NetLinx.axi`)
- Statements
    - :white_check_mark: Expression Statements
    - :white_check_mark: Compound Statements
    - :white_check_mark: Return Statements
    - :white_check_mark: Break Statements
    - :white_check_mark: Continue Statements
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
    - :white_check_mark: Call Statements (for legacy `DEFINE_CALL` functions)
    - :white_check_mark: System Call Statements
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
    - :white_check_mark: Legacy Push
    - :white_check_mark: Legacy Release
- Literals
    - :white_check_mark: String Literals
        - :white_check_mark: Single Quoted String Literals
        - :white_check_mark: Escape Sequence for Single Quotes (`''`)
    - :white_check_mark: Number Literals
        - :white_check_mark: Decimal
        - :white_check_mark: Hexadecimal
        - :white_check_mark: Floating Point
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

## Known Limitations :warning:

### Preprocessor Directives in Expressions

The NetLinx language allows preprocessor directives to be used within expressions, like:

```netlinx
(foo #IF_DEFINED BAR && baz #END_IF && foobar)
```

While this is valid NetLinx code that compiles correctly, tree-sitter has limitations when parsing these constructs due to the nature of preprocessor directives operating at a different level than normal syntax.

When encountering preprocessor directives within expressions, the parser will:

1. **Maintain the overall expression structure** - The parenthesized expression remains intact
2. **Generate some error nodes** - The preprocessor directives are marked as errors
3. **Preserve correct syntax highlighting** - Despite the errors, tokens are still correctly identified
4. **Keep all identifiers and operators** - Variable names and operators remain properly connected

**Example Parse Tree**

```
(source_file
  (expression_statement
    (parenthesized_expression
      (ERROR
        (identifier) // <- foo
        (preproc_if_defined_keyword))
      (binary_expression
        left: (binary_expression
          left: (identifier) // <- BAR
          right: (identifier))  // <- baz
        (ERROR
          (preproc_end_if_keyword))
        right: (identifier))))) // <- foobar
```

**Implications**

- **Editor Experience**: Syntax highlighting and code navigation should work normally
- **Error Reports**: Your editor may show these areas as errors, which can be safely ignored
- **Alternative Approach**: For cleaner parsing, consider restructuring complex conditional expressions to avoid embedding preprocessor directives within expressions, like:
    ```
    #IF_DEFINED BAR
      (foo && baz && foobar)
    #ELSE
      (foo && foobar)
    #END_IF
    ```

## Install :zap:

### Node.js (npm)

For JavaScript/Node.js projects:

```sh
npm install tree-sitter-netlinx

# or

yarn add tree-sitter-netlinx

# or

pnpm add tree-sitter-netlinx
```

### Rust (Cargo)

For Rust projects:

```sh
cargo add tree-sitter-netlinx
```

### Python (pip)

For Python projects:

```sh
pip install tree-sitter-netlinx
```

### Nix

For Nix, NixOS and Home Manager reference:

```nix
pkgs.tree-sitter.withPlugins (plugins: with plugins; [
  tree-sitter-netlinx
  # ...
])
```

### Manual Installation

If you want to install the grammar manually, you can clone the repository and build it yourself:

```sh
git clone https://github.com/Norgate-AV/tree-sitter-netlinx
cd tree-sitter-netlinx
npm install
npx tree-sitter generate
```

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
- Devchan range expressions used with devchan operations

### Flexibility Over Semantic Correctness

The parser deliberately prioritizes syntactic flexibility over strict semantic validation:

- **Section-Independent Parsing**: Declarations can appear anywhere in the code, even outside their semantically correct sections. The parser doesn't enforce section-specific constraints that the NetLinx compiler would apply.

- **Context-Free Analysis**: Device definitions, constants, and variables are parsed based on their syntactic structure rather than their semantic context. For example, device definitions in a `DEFINE_DEVICE` section are parsed as standard assignment expressions.

- **Support for Implicit Typing**: The parser accommodates NetLinx's implicit typing behaviors. In NetLinx, when type declarations are omitted, the compiler applies implicit types—`INTEGER` for regular variables and `CHAR` for array variables.

**Examples:**

```netlinx
DEFINE_CONSTANT
FOO = 1  // Parsed as an assignment expression rather than a specialized constant declaration

DEFINE_VARIABLE
bar = 1  // Parsed as an assignment expression
         // NetLinx compiler would implicitly type this as INTEGER

baz[10]  // Parsed as an identifier with subscript
         // NetLinx compiler would implicitly type this as CHAR array
```

This approach enables more resilient parsing during code editing and provides better syntax highlighting and tooling support, even for incomplete or semantically imperfect code. Semantic validation is intentionally left to the NetLinx compiler or separate analysis tools.

## References :book:

- [NetLinx Language Reference Guide](https://www.amx.com/en/site_elements/amx-language-reference-guide-netlinx-programming-language)
- [NetLinx Style Guide](https://www.amx.com/vn/site_elements/style-guide-netlinx-studio-v-4)

## Team :soccer:

This project is maintained by the following person(s) and a bunch of [awesome contributors](https://github.com/Norgate-AV/tree-sitter-netlinx/graphs/contributors).

<table>
  <tr>
    <td align="center"><a href="https://github.com/damienbutt"><img src="https://avatars.githubusercontent.com/damienbutt?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damien Butt</b></sub></a><br /></td>
  </tr>
</table>

## Contributors :sparkles:

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks go to these awesome people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://simple.industries/"><img src="https://avatars.githubusercontent.com/u/843652?v=4?s=100" width="100px;" alt="~kb"/><br /><sub><b>~kb</b></sub></a><br /><a href="https://github.com/Norgate-AV/tree-sitter-netlinx/commits?author=kimburgess" title="Documentation">📖</a> <a href="https://github.com/Norgate-AV/tree-sitter-netlinx/issues?q=author%3Akimburgess" title="Bug reports">🐛</a> <a href="https://github.com/Norgate-AV/tree-sitter-netlinx/commits?author=kimburgess" title="Code">💻</a> <a href="https://github.com/Norgate-AV/tree-sitter-netlinx/commits?author=kimburgess" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.

Contributions are welcome! Please fork and open a pull request if you have any suggestions or improvements.

Any help would be greatly appreciated.

## LICENSE :balance_scale:

[MIT](./LICENSE)
