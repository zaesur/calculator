const solve = require('./parser.js')

/* Some helper functions */
const isDigit = s => '0123456789'.includes(s)
const isOperator = s => '+-*/'.includes(s)
const isDecimal = s => s === '.'
const isEqual = s => s === '='
const isReset = s => s === 'AC'

/* Calculator state */
class CalculatorState {
  constructor (value = '0', memory = [], action = 'init') {
    this.value = value
    this.memory = memory
    this.action = action
  }

  operate (input) {
    if (isDigit(input)) {
      return new CalculatorState(
        this.value === '0' ? input : this.value + input,
        this.action === 'equal' ? [] : this.memory,
        'digit'
      )
    } else if (isDecimal(input)) {
      return new CalculatorState(
        this.value.includes('.') ? this.value : this.value + input,
        this.action === 'equal' ? [] : this.memory,
        'digit'
      )
    } else if (isOperator(input)) {
      return new CalculatorState(
        '0',
        this.action === 'operator'
          ? [this.memory.slice(0, this.memory.length - 1), input]
          : this.action === 'equal'
            ? [...this.memory, input]
            : [...this.memory, this.value, input],
        'operator'
      )
    } else if (isEqual(input)) {
      const result = solve([...this.memory, this.value])
      return this.action === 'operator' ||
        this.action === 'equal' ||
        this.action === 'init'
        ? this
        : result === Infinity
          ? new CalculatorState(this.value, this.memory, 'divbyzero')
          : new CalculatorState('0', [result], 'equal')
    } else if (isReset(input)) {
      return new CalculatorState()
    } else {
      return this
    }
  }
}

module.exports = CalculatorState
