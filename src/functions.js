const isDigit = input => '.0123456789'.includes(input)
const isOperator = input => '+-*/'.includes(input)
const isEqual = input => input === '='
const isClear = input => input === 'AC'

function operate(operator, a, b) {
  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };
  return operators[operator](a, b);
}

function calculate(operands, operators) {
  if (operators.length) {
    const result = operate(operators[0], operands.slice(-2)[0], operands.slice(-1)[0])
    return calculate([...operands.slice(0,-2), result], operators.slice(1))
  } else {
    return operands[0]
  }
}

const operatorPrecedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}

class CalculatorState {
  constructor(state = 'init', value = '0', memory = [], operators = ['+']) {
    this.state = state
    this.value = value
    this.memory = memory
    this.operators = operators
  }

  get operator() {
    return this.operators[0]
  }

  evalDigit(input) {
    if (this.state === 'error' || (input === '.' && this.value.includes('.'))) {
      return this
    } else if (this.state === 'operator' || this.state === 'init') {
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
        `${this.value}${input}`,
        this.memory,
        this.operators
      )
    }
  }
  
  evalOperator(input) {
    if (this.state === 'error') {
      return this;
    } else if (this.state === 'operator' || this.state === 'init') {
      return new CalculatorState(
        'operator',
        this.value,
        this.memory,
        [input, this.operators.slice(1)],
      )
    } else if (operatorPrecedence[input] < operatorPrecedence[this.operators[0]]) {
      return new CalculatorState(
        'operator',
        calculate([...this.memory, parseFloat(this.value)], this.operators),
        [],
        [input]
      )
    } else {
      return new CalculatorState(
        'operator',
        this.value,
        this.memory,
        [input, ...this.operators]
      )
    }
  }
  
  evalEqual() {
    if (this.state === 'error' || this.state === 'equal' || this.state === 'init') {
      return this
    } else if (this.state === 'operator') {
      return new CalculatorState(
        'equal',
        calculate([...this.memory, parseFloat(this.value), parseFloat(this.value)], this.operators),
        [],
        []
      )
    } else {
      return new CalculatorState(
        'equal',
        calculate([...this.memory, parseFloat(this.value)], this.operators),
        [],
        []
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
