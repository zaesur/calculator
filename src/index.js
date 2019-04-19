const functions = require('./functions.js');

let calculator = new functions.CalculatorState()
const MAX_DIGITS = 10
const DIV_BY_ZERO = 'You divided by zero!'

function render() {
  const precision = Math.min(MAX_DIGITS, calculator.value.length)
  const formattedValue = parseFloat(calculator.value).toPrecision(precision)
  const newText = (calculator.state === 'error') ? DIV_BY_ZERO : formattedValue
  document.getElementById('display').textContent = newText
}

document
  .getElementById('calculator')
  .addEventListener('click', (e) => {
    calculator = calculator.takeInput(e.target.textContent)
    render()
  });
