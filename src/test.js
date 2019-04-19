const operate = require('./index.js');

test('operate adds', () => {
  expect(operate('add', 9, 2)).toBe(11);
});
test('operate subtracts', () => {
  expect(operate('sub', 9, 2)).toBe(7);
});
test('operate multiplies', () => {
  expect(operate('mul', 9, 2)).toBe(18);
});
test('operate divides', () => {
  expect(operate('div', 9, 2)).toBe(4.5);
});
