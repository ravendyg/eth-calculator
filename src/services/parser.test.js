import { parse } from './parser';

it('throws on incorrect symbol', () => {
  const expr = 'asd';
  expect(() => parse(expr))
    .toThrow(new Error('Contains incorrect symbols'));
});

it('throws if number of parentheses does not add up', () => {
  const expr = '1 * (10 - 3';
  expect(() => parse(expr))
    .toThrow(new Error('Wrong parentheses count'));
});

it('parses a correct expression', () => {
  const expr = '1 * (10.1 - 3 ^ 3)';
  expect(parse(expr))
    .toEqual([1, '*', '(', 10.1, '-', 3, '^', 3, ')']);
});
