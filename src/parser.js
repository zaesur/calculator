/* Solve RPN functionally */
const infixToPostfix = function (infixExpression) {
  const operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  }
  const iterate = function (index, operators, result) {
    const el = infixExpression[index]
    const currentPrecedence = operatorPrecedence[el]
    const precedenceLevel = operatorPrecedence[operators[0]]
    return infixExpression.length === index
      ? [...result, ...operators] : !isNaN(el)
        ? iterate(index + 1, operators, [...result, el])
        : precedenceLevel >= currentPrecedence
          ? iterate(index, operators.slice(1), [...result, operators[0]])
          : iterate(index + 1, [el, ...operators], result)
  }
  return iterate(0, [], [])
}

const operate = function (operator, firstOperand, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return firstOperand / secondOperand
  }
}

const solvePostfix = function (postfixExpression) {
  // implementation for unary operators possible
  const isBinaryOperator = c => '+-*/'.includes(c)
  const binaryOperatorIndex = postfixExpression.findIndex(isBinaryOperator)
  if (binaryOperatorIndex >= 2) {
    const head = postfixExpression.slice(0, binaryOperatorIndex - 2)
    const result = operate(
      postfixExpression[binaryOperatorIndex],
      parseFloat(postfixExpression[binaryOperatorIndex - 2]),
      parseFloat(postfixExpression[binaryOperatorIndex - 1])
    )
    const tail = postfixExpression.slice(binaryOperatorIndex + 1)
    return solvePostfix([...head, result, ...tail])
  } else {
    return parseFloat(postfixExpression[0])
  }
}

const solve = function (expression) {
  return solvePostfix(infixToPostfix(expression))
}

module.exports = solve
