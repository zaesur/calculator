const functions = require('./functions.js');

let calculator = new functions.CalculatorState()

function render() {
  if (calculator.state !== 'digit') {
    // Clear the active operator
    document
      .querySelectorAll('#calculator .operator')
      .forEach((e) => e.classList.remove('active'))
  }
  if (calculator.state === 'operator') {
    // Activate the operator
    document
      .querySelectorAll('#calculator .operator')
      .forEach((e) => {
        if (calculator.operator === e.textContent) {
          e.classList.add('active')
        }
      })
  }
  // Finally, render the current value or error
  document
    .getElementById('display')
    .textContent = (calculator.state === 'error') ? '💥' : calculator.value
}

document
  .getElementById('calculator')
  .addEventListener('click', (e) => {
    calculator = calculator.takeInput(e.target.textContent)
    render()
  });

window
  .addEventListener('keydown', (e) => {
    calculator = calculator.takeInput(e.keyCode === 8 ? 'AC' : e.key)
    render()
  });