# Contributing to tree-sitter-netlinx

First off, thank you for considering contributing to tree-sitter-netlinx! This is a community effort, and we welcome your contributions to help make NetLinx syntax highlighting and parsing better for everyone.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn or pnpm
- Basic knowledge of Tree-sitter grammar development

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
    ```
    git clone https://github.com/YOUR-USERNAME/tree-sitter-netlinx.git
    cd tree-sitter-netlinx
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Generate the parser:
    ```
    npm run generate
    ```

## Development Workflow

### Making Changes

1. Create a branch for your changes:

    ```
    git checkout -b your-feature-branch
    ```

2. Make your changes to the grammar in `grammar.js`

3. Generate the parser:

    ```
    npm run generate
    ```

4. Test your changes:

    ```
    npm test
    ```

5. Add or update tests in the `test/corpus` directory to cover your changes

### Grammar Development Tips

- Start by looking at the existing grammar in `grammar.js`
- Use the Tree-sitter [documentation](https://tree-sitter.github.io/tree-sitter/creating-parsers) for reference
- Test your grammar changes with real NetLinx code examples
- Use the Tree-sitter playground to visualize the parse tree

## Testing

We use Tree-sitter's built-in test framework. Tests are located in the `test/corpus` directory and are organized by language feature.

To add a new test:

1. Create or edit a `.txt` file in the appropriate corpus directory
2. Add a test name as a comment: `==================`
3. Add example code
4. Add the expected AST structure: `---` followed by the S-expression representation of the expected tree

## Submitting Changes

1. Update the tests to cover your changes
2. Ensure all tests pass: `npm test`
3. Commit your changes with a descriptive message
4. Push to your fork
5. Submit a Pull Request to the main repository

### Pull Request Guidelines

- Provide a clear description of the problem and solution
- Include any relevant issue numbers with "Fixes #123" syntax
- Keep changes focused on a single issue/feature
- Update documentation if needed
- Ensure your code follows the project's coding style

## Coding Style

- Follow the existing code style in the grammar.js file
- Use descriptive names for rules
- Add comments to explain complex patterns
- Organize related rules together

## License

By contributing to tree-sitter-netlinx, you agree that your contributions will be licensed under the same license as the project (usually MIT).

## Questions?

If you have any questions about contributing, please open an issue or reach out to the maintainers.

Thank you for helping improve tree-sitter-netlinx!
