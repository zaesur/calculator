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
test('calculate returns a single number', () => {
  expect(functions.calculate([1], [])).toBe(1)
})
test('calculate returns addition', () => {
  expect(functions.calculate([10,2], ['+'])).toBe(12)
})
test('calculate returns subtraction', () => {
  expect(functions.calculate([10,2], ['-'])).toBe(8)
})
test('calculate returns multiplication', () => {
  expect(functions.calculate([10,2], ['*'])).toBe(20)
})
test('calculate returns division', () => {
  expect(functions.calculate([10,2], ['/'])).toBe(5)
})
test('works right to left', () => {
  expect(functions.calculate([10,4,3,2,1], ['+', '+', '+', '-'])).toBe(0)
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
test('calculator returns operator', () => {
  let calc = new functions.CalculatorState();
  ['+'].forEach((e) => calc = calc.takeInput(e))
  expect(calc.operator).toBe('+')
})
test('calculator does addition (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '+', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(12)
})
test('calculator does subtraction (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '-', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(8)
})
test('calculator does multiplication (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '*', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(20)
})
test('calculator does division (simple)', () => {
  let calc = new functions.CalculatorState();
  ['1', '0', '/', '2', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(5)
})
test('calculator evaluates short sequences', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '+', '3', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(6)
})
test('calculator evaluates long sequences', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '+', '3', '+', '4', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(10)
})
test('calculator correctly evaluates precedence in short sequences', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '*', '3', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(7)
})
test('calculator correctly evaluates precedence in long sequences', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '+', '3', '*', '4', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(15)
})
test('calculator correctly evaluates mixed precedence in long sequences', () => {
  let calc = new functions.CalculatorState();
  ['1', '-', '2', '*', '3', '+', '5', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(0)
})