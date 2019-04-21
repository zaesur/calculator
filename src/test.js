const functions = require('./functions.js')

test('operate adds', () => {
  expect(functions.operate('+', 10, 2)).toBe(12)
})
test('operate subtracts', () => {
  expect(functions.operate('-', 10, 2)).toBe(8)
})
test('operate multiplies', () => {
  expect(functions.operate('*', 10, 2)).toBe(20)
})
test('operate divides', () => {
  expect(functions.operate('/', 10, 2)).toBe(5)
})
test('calculator stores a digit', () => {
  let calc = new functions.CalculatorState();
  ['5'].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('5')
})
test('calculator stores multiple digits', () => {
  let calc = new functions.CalculatorState();
  ['5', '5'].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('55')
})
test('calculator stores decimals', () => {
  let calc = new functions.CalculatorState();
  ['5', '.', '5'].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('5.5')
})
test('calculator does addition (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '+', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('12')
})
test('calculator does subtraction (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '-', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('8')
})
test('calculator does multiplication (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '*', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('20')
})
test('calculator does division (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '/', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('5')
})
test('calculator chains operations', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '+', '3', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('6')
})
test('calculator correctly evaluates precedence', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '*', '3', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe('7')
})