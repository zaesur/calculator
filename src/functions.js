const isDigit = input => '0123456789'.includes(input)
const isDecimal = input => input === '.'
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

class CalculatorState {
  constructor(state, value, operator, ans) {
    this.state = state || 'init'
    this.value = value || '0'
    this.operator = operator || '+'
    this.ans = ans || '0'
  }

  evalDigit(input) {
    if (this.state === 'error') {
      return this
    } else if (this.state === 'init' && input === '0') {
      return this
    } else if (this.state === 'init') {
      return new CalculatorState(
        'digit',
        input,
        this.operator,
        this.ans
      )
    } else if (this.state === 'operator') {
      return new CalculatorState(
        'digit',
        input,
        this.operator,
        this.value
      )
    } else if (this.state === 'equal') {
      return new CalculatorState(
        'digit',
        input,
        '+',
        '0'
      )
    } else {
      return new CalculatorState(
        'digit',
        `${this.value}${(this.state === 'decimal') ? '.' : ''}${input}`,
        this.operator,
        this.ans
      )
    }
  }

  evalDecimal() {
    if (this.value.includes('.')) {
      return this
    } else {
      return new CalculatorState(
        'decimal',
        this.value,
        this.operator,
        this.ans
      )
    }
  }
  
  evalOperator(input) {
    if (this.state === 'error') {
      return this;
    } else {
      return new CalculatorState(
        'operator',
        this.value,
        input,
        this.ans,
      )
    }
  }
  
  evalEqual() {
    if (this.state === 'error' || this.state === 'equal' || this.state === 'init') {
      return this
    } else if (this.value === '0' && this.operator === '/') {
      return new CalculatorState('error')
    } else {
      return new CalculatorState(
        'equal',
        `${operate(this.operator, parseFloat(this.ans), parseFloat(this.value))}`,
        '+',
        '0',
      )
    }
  }

  evalClear() {
    return new CalculatorState()
  }

  takeInput(input) {
    return (isDigit(input))
      ? this.evalDigit(input)
      : (isDecimal(input))
      ? this.evalDecimal()
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
  CalculatorState,
};
