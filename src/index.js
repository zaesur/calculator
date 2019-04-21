const functions = require('./functions.js');

let calculator = new functions.CalculatorState()
const calculatorElement = document.getElementById('calculator')
const DIV_BY_ZERO = 'You divided by zero!'

function render() {
  if (calculator.state === 'equal' || calculator.state === 'operator') {
    document
      .querySelectorAll('#calculator .operator')
      .forEach((e) => e.classList.remove('active'))
  }
  if (calculator.state === 'operator') {
    document
      .querySelectorAll('#calculator .operator')
      .forEach((e) => {
        if (calculator.operator === e.textContent) {
          e.classList.add('active')
        }
      })
  }
  document
    .getElementById('display')
    .textContent = (calculator.state === 'error') ? DIV_BY_ZERO : calculator.value
}

calculatorElement
  .addEventListener('click', (e) => {
    calculator = calculator.takeInput(e.target.textContent)
    render()
  });
