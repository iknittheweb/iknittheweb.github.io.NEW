// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file configures Prettier, a tool for automatically formatting code.
// Prettier helps keep your code style consistent and readable across your project.
//
// Key concepts:
// - Prettier: Code formatter for HTML, CSS, JS, and more
// - Option: A setting that controls how Prettier formats your code
// - Configuration: Customizes Prettier's behavior for your project
// ------------------------------------------------------------
// Prettier configuration with explanatory comments
module.exports = {
  printWidth: 120, // Maximum line length before wrapping
  tabWidth: 2, // Number of spaces per indentation level
  semi: true, // Add semicolons at the ends of statements
  singleQuote: true, // Use single quotes instead of double quotes
  trailingComma: 'es5', // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  endOfLine: 'lf', // Use line feed (\n) for line endings
  bracketSpacing: true, // Print spaces between brackets in object literals
  htmlWhitespaceSensitivity: 'strict', // How to handle whitespace in HTML
  singleAttributePerLine: true, // Put each HTML attribute on its own line
  bracketSameLine: true, // Put the > of a multi-line HTML element at the end of the last line
  arrowParens: 'always', // Always include parentheses around arrow function parameters
  proseWrap: 'always', // Wrap markdown text as needed
};