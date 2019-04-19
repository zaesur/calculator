const solve = require('../src/parser.js');

test('solve returns single number characters as int', () => {
  expect(solve('1')).toBe(1);
});
test.skip('solve returns single negative number characters as int', () => {
  expect(solve('-1')).toBe(-1);
});
test('solve solves simple addition', () => {
  expect(solve('2+3')).toBe(5);
});
test('solve solves simple subtraction', () => {
  expect(solve('4-2')).toBe(2);
});
test('solve solves simple multiplication', () => {
  expect(solve('4*2')).toBe(8);
});
test('solve solves simple division', () => {
  expect(solve('4/2')).toBe(2.0);
});
