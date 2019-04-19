const functions = require('./functions.js');

let calculator = new functions.CalculatorState()

function render() {
  const newText = (calculator.state === 'error') ? 'div by zero!' : calculator.value;
  document.getElementById('display').textContent = newText
}

document
  .getElementById('calculator')
  .addEventListener('click', (e) => {
    calculator = calculator.takeInput(e.target.textContent)
    render();
  });
