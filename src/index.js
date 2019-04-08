/* eslint-disable space-before-function-paren */
import { CalculatorState } from './calculator.js'

function render (state) {
  const display = document.querySelector('.display')
  switch (state.action) {
    case 'init':
    case 'digit':
      display.textContent = state.value
      break
    case 'equal':
      display.textContent = state.memory[0]
      break
    case 'divbyzero':
      display.textContent = 'Division by zero!'
      break
  }
}

function update(symbol) {
  calculator = calculator.operate(symbol)
  render(calculator)
}

let calculator = new CalculatorState()

document
  .querySelector('.calculator')
  .addEventListener('click', e => update(e.target.textContent))
window.addEventListener('keypress', k => update(k.key))
