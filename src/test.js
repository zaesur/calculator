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

  check.it('works right to left', gen.int, gen.int, gen.int, (x, y, z) => {
    expect(functions.calculate([x, y, z], ['+', '*'])).toEqual((z + y) * x)
  })
})

describe('calculator', () => {
  test('stores a digit', () => {
    let calc = new functions.CalculatorState();
    ['5'].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe('5')
  })

  test('stores multiple digits', () => {
    let calc = new functions.CalculatorState();
    ['5', '5'].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe('55')
  })

  test('stores decimals', () => {
    let calc = new functions.CalculatorState();
    ['5', '.', '5'].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe('5.5')
  })

  test('returns operator', () => {
    let calc = new functions.CalculatorState();
    ['+'].forEach((e) => calc = calc.takeInput(e))
    expect(calc.operator).toBe('+')
  })

  test('performs addition', () => {
    let calc = new functions.CalculatorState();
    ['1', '0', '+', '2', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(12)
  })

  test('performs subtraction', () => {
    let calc = new functions.CalculatorState();
    ['1', '0', '-', '2', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(8)
  })

  test('performs multiplication', () => {
    let calc = new functions.CalculatorState();
    ['1', '0', '*', '2', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(20)
  })

  test('performs division', () => {
    let calc = new functions.CalculatorState();
    ['1', '0', '/', '2', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(5)
  })

  test('evaluates sequences of operations', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '2', '+', '3', '+', '4', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(10)
  })

  test('evaluates precedence in short sequences', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '2', '*', '3', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(7)
  })

  test('evaluates precedence in long sequences', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '2', '+', '3', '*', '4', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(15)
  })

  test('evaluates mixed precedence in long sequences', () => {
    let calc = new functions.CalculatorState();
    ['1', '-', '2', '*', '3', '+', '5', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(0)
  })

  test('evaluates sequential calculations', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '2', '=', '*', '3', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(9)
  })

  test('doubles operand when no new number is given', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(2)
  })

  test('repeats calculations', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '2', '=', '=', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(7)
  })

  test('clears memory when new calculation is entered', () => {
    let calc = new functions.CalculatorState();
    ['1', '+', '=', '2', '+', '3', '='].forEach((e) => calc = calc.takeInput(e))
    expect(calc.value).toBe(5)
  })
})