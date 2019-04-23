require('jasmine-check').install()
const functions = require('./functions.js')

describe('operate', () => {
  check.it('adds two numbers', gen.int, gen.int, (x, y) => {
    expect(functions.operate('+', x, y)).toEqual(x + y)
  })
  check.it('subtracts two numbers', gen.int, gen.int, (x, y) => {
    expect(functions.operate('-', x, y)).toEqual(x - y)
  })
  check.it('multiplies two numbers', gen.int, gen.int, (x, y) => {
    expect(functions.operate('*', x, y)).toEqual(x * y)
  })
  check.it('divides two numbers', gen.int, gen.int, (x, y) => {
    expect(functions.operate('/', x, y)).toEqual(x / y)
  })
})

describe('calculate', () => {
  check.it('returns a single number', gen.int, (x) => {
    expect(functions.calculate([x], [])).toEqual(x)
  })
  check.it('returns the addition of numbers', gen.int, gen.int, (x, y) => {
    expect(functions.calculate([x, y], ['+'])).toEqual(x + y)
  })
  check.it('returns the subtraction of numbers', gen.int, gen.int, (x, y) => {
    expect(functions.calculate([x, y], ['-'])).toEqual(x - y)
  })
  check.it('returns the multiplication of numbers', gen.int, gen.int, (x, y) => {
    expect(functions.calculate([x, y], ['*'])).toEqual(x * y)
  })
  check.it('returns the division of numbers', gen.int, gen.int, (x, y) => {
    expect(functions.calculate([x, y], ['/'])).toEqual(x / y)
  })
  check.it('works right to left', gen.int, gen.int, gen.int, (a,b,c) => {
    expect(functions.calculate([a, b, c], ['+', '*'])).toEqual((c + b) * a)
  })
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
test('calculator correctly evaluates sequential calculations', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '=', '*', '3', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(9)
})
test('calculator doubles operand when no new number is given', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(2)
})
test('calculator repeats calculations', () => {
  let calc = new functions.CalculatorState();
  ['1', '+', '2', '=', '=', '='].forEach((e) => calc = calc.takeInput(e))
  expect(calc.value).toBe(7)
})