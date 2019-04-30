const { calculate } = require('./calculator');

it('calculates expression', () => {
  expect(calculate([])).toBe(0);
});
