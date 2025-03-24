# NetLinx Grammar Analysis for Tree-Sitter Implementation

## Introduction

This document presents findings from analyzing the NetLinx compiler components and reference implementations to improve the tree-sitter grammar for NetLinx, with special focus on preprocessor directive handling.

## NetLinx Compiler Components

The NetLinx compiler consists of several components:

| Component      | Description             | Relevance to Grammar                                         |
| -------------- | ----------------------- | ------------------------------------------------------------ |
| **nlc.dll**    | Core compiler component | Contains grammar rules and syntax parsing logic              |
| **nlpp.dll**   | Preprocessor component  | Handles preprocessor directives (#DEFINE, #IF_DEFINED, etc.) |
| **NetLinx.rw** | Reserved Words file     | Lists language keywords and preprocessor directives          |

## Preprocessor Directives

From `NetLinx.rw`, the preprocessor directives are:

```netlinx
#ELSE
#INCLUDE
#DISABLE_WARNING
#DEFINE
#END_IF
#IF_DEFINED
#IF_NOT_DEFINED
#WARN
```

## Language Structure Insights

### Section Types

NetLinx code is organized into sections:

```netlinx
DEFINE_MODULE
DEFINE_TOGGLING
DEFINE_CONNECT_LEVEL
DEFINE_COMBINE
DEFINE_EVENT
DEFINE_FUNCTION
DEFINE_PROGRAM
DEFINE_START
DEFINE_MUTUALLY_EXCLUSIVE
DEFINE_LATCHING
DEFINE_DEVICE
DEFINE_CONSTANT
DEFINE_VARIABLE
DEFINE_TYPE
```

### Types and Data Structures

NetLinx supports various data types:

```netlinx
INTEGER
SINTEGER
LONG
SLONG
CHAR
WIDECHAR
FLOAT
DOUBLE
DEV
DEVCHAN
DEVLEV
```

### Event Handler Types

NetLinx has several event handler types:

```netlinx
BUTTON_EVENT
CHANNEL_EVENT
DATA_EVENT
LEVEL_EVENT
TIMELINE_EVENT
CUSTOM_EVENT
```

## Grammar Structure Findings

The compiler distinguishes between different context levels:

1. **Top-Level Context** - Items that can appear at file level
2. **Section-Level Context** - Items that can appear inside a section
3. **Block-Level Context** - Items that can appear inside code blocks

Each context has a different set of valid constructs, and preprocessor directives can appear in all contexts.
