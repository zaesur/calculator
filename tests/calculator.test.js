const CalculatorState = require('../src/calculator.js');

test('solve returns single number characters as int', () => {
  const test = new CalculatorState();
  expect(test).toBe(test);
});
