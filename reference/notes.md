# Context-Free Grammar Notes

## Specifier

A **specifier** identifies characteristics or qualities of an entity without defining its structure or implementation.

**Example**

```c
const int value = 0;    // "const" is a type qualifier, "int" is a type specifier
```

## Declarator

A **declarator** names an entity and potentially specifies additional details about its form (like array dimensions or function parameters).

**Example**

```c
int counter;      // "counter" is the declarator
int numbers[10];  // "numbers[10]" is the array declarator
```

## Declaration

A **declaration** introduces an entity to the system, specifying its type and name without necessarily providing implementation.

**Example**

```c
int calculate(int x);  // Function declaration (prototype)
extern int counter;    // Variable declaration
```

## Definition

A **definition** provides the complete implementation of an entity, including any initialization or body.

**Example**

```c
// Function definition with implementation
int calculate(int x) {
    return x * 2;
}

// Struct definition with fields
struct Person {
    char name[50];
    int age;
};

// Variable definition with initialization
int counter = 0;
```
