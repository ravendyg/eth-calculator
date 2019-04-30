const { calculate } = require('./calculator');

it('throws if the expression is empty', () => {
  expect(() => calculate([]))
    .toThrow(new Error('Invalid expression'));
});

it('throws when dividing by zero', () => {
  expect(() => calculate([1, 2, 2, '-', '/']))
    .toThrow(new Error('Division by zero'));
});

it('calculates expression "3 + 4 * 2 / (1 - 3) ^ 2" === 5', () => {
  expect(calculate([3, 4, 2, '*', 1, 3, '-', 2, '^', '/', '+']))
    .toBe(5);
});
