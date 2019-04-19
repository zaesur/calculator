const functions = require('./functions.js');

test('operate adds', () => {
  expect(functions.operate('add', 10, 2)).toBe(12);
});
test('operate subtracts', () => {
  expect(functions.operate('sub', 10, 2)).toBe(8);
});
test('operate multiplies', () => {
  expect(functions.operate('mul', 10, 2)).toBe(20);
});
test('operate divides', () => {
  expect(functions.operate('div', 10, 2)).toBe(5);
});
