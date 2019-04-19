function operate(operator, a, b) {
  const operators = {
    add: (x, y) => x + y,
    sub: (x, y) => x - y,
    mul: (x, y) => x * y,
    div: (x, y) => x / y,
  };
  return operators[operator](a, b);
}

module.exports = operate;
