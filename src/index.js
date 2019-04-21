const functions = require('./functions.js');

let calculator = new functions.CalculatorState()

function render() {
  if (calculator.state !== 'digit') {
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
    .textContent = (calculator.state === 'error') ? '💥' : calculator.value
}

document
  .getElementById('calculator')
  .addEventListener('click', (e) => {
    calculator = calculator.takeInput(e.target.textContent)
    render()
  });
