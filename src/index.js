const functions = require('./functions.js');

let calculator = new functions.CalculatorState()
const DIV_BY_ZERO = 'You divided by zero!'

function render() {
  const newText = (calculator.state === 'error') ? DIV_BY_ZERO : parseFloat(calculator.value)
  document.getElementById('display').textContent = newText
}

document
  .getElementById('calculator')
  .addEventListener('click', (e) => {
    calculator = calculator.takeInput(e.target.textContent)
    render()
  });
