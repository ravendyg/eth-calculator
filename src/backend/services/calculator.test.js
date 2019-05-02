const { calculate } = require('./calculator');

it('throws if the expression is empty', async () => {
  try {
    await calculate([]);
  } catch (err) {
    expect(err.message)
      .toEqual('Invalid expression');
  }
});

it('throws when dividing by zero', async () => {
  try {
    await calculate([1, 2, 2, '-', '/']);
  } catch (err) {
    expect(err.message)
      .toEqual('Division by zero');
  }
});

it('calculates expression "3 + 4 * 2 / (1 - 3) ^ 2" === 5', async () => {
  const result = await calculate([3, 4, 2, '*', 1, 3, '-', 2, '^', '/', '+']);
  expect(result).toBe(5);
});
