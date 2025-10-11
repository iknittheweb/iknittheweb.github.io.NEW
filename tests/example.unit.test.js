// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file contains unit tests for your JavaScript code.
// Unit tests check that individual functions or modules work as expected.
//
// Key concepts:
// - Unit test: Checks one small part of your code (like a function)
// - Assertion: Statement that must be true for the test to pass
// - Test runner: Tool that runs your tests and reports results
// ------------------------------------------------------------
// Example Jest unit test for a simple JS function
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
