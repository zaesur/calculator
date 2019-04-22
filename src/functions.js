const isDigit = input => '.0123456789'.includes(input)
const isOperator = input => '+-*/'.includes(input)
const isEqual = input => input === '='
const isClear = input => input === 'AC'

const operatorPrecedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}

function operate(operator, a, b) {
  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  }
  return operators[operator](a, b);
}

function calculate(operands, operators) {
  if (operators.length) {
    const result = operate(operators[0], ...operands.slice(-2))
    return calculate([...operands.slice(0,-2), result], operators.slice(1))
  } else {
    return operands[0]
  }
}

class CalculatorState {
  constructor(state = 'init', value = '0', memory = [], operators = []) {
    this.state = state
    this.value = value
    this.memory = memory
    this.operators = operators
  }

  get operator() {
    return this.operators[0]
  }

  evalDigit(input) {
    if (this.state === 'error') {
      return this
    } else if (this.state === 'init') {
      return new CalculatorState(
        'digit',
        (input === '.') ? `0${input}` : input,
        this.memory,
        this.operators
      )
    } else if (this.state === 'operator') {
      return new CalculatorState(
        'digit',
        (input === '.') ? `0${input}` : input,
        [...this.memory, parseFloat(this.value)],
        this.operators,
      )
    } else if (this.state === 'equal') {
      return new CalculatorState(
        'digit',
        (input === '.') ? `0${input}` : input,
        [],
        []
      )
    } else {
      return new CalculatorState(
        'digit',
        (input === '.' && this.value.includes('.')) ? this.value : `${this.value}${input}`,
        this.memory,
        this.operators
      )
    }
  }
  
  evalOperator(input) {
    if (this.state === 'error') {
      return this
    } else if (this.state === 'equal') {
      return new CalculatorState(
        'operator',
        this.value,
        [],
        [input]
      )
    } else if (this.state === 'operator' || this.state === 'init' ) {
      // Replace operator if existent
      return new CalculatorState(
        'operator',
        this.value,
        this.memory,
        [input, ...this.operators.slice(1)],
      )
    } else if (operatorPrecedence[input] <= operatorPrecedence[this.operators[0]]) {
      // Calculate the result immediately
      return new CalculatorState(
        'operator',
        calculate([...this.memory, parseFloat(this.value)], this.operators),
        [],
        [input]
      )
    } else {
      // Push the operator on the stack
      return new CalculatorState(
        'operator',
        this.value,
        this.memory,
        [input, ...this.operators]
      )
    }
  }
  
  evalEqual() {
    if (this.state === 'error' || this.state === 'init' || !this.operators.length) {
      return this
    } else if (this.value === '0' || this.value === '0.' && this.operators[0] === '/') {
      return new CalculatorState('error')
    } else if (this.state === 'operator') {
      // Use the current value as second operand when no value is entered after operator
      return new CalculatorState(
        'equal',
        calculate([...this.memory, parseFloat(this.value), parseFloat(this.value)], this.operators),
        [...this.memory, parseFloat(this.value)],
        this.operators
      )
    } else if (this.state === 'equal') {
      // Redo previous operation on current value if equal is pressed repeatedly
      return new CalculatorState(
        'equal',
        calculate([parseFloat(this.value), ...this.memory], this.operators),
        this.memory,
        this.operators
      )
    } else {
      // Calculate the result
      return new CalculatorState(
        'equal',
        calculate([...this.memory, parseFloat(this.value)], this.operators),
        [parseFloat(this.value)],
        [this.operators[0]]
      )
    }
  }

  evalClear() {
    return new CalculatorState()
  }

  takeInput(input) {
    return (isDigit(input))
      ? this.evalDigit(input)
      : (isOperator(input))
      ? this.evalOperator(input)
      : (isEqual(input))
      ? this.evalEqual()
      : (isClear(input))
      ? this.evalClear()
      : this
  }
}

module.exports = {
  operate,
  calculate,
  CalculatorState,
}
