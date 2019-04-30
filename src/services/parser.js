const notAllowedSymbolsRegexp = /[^\d+-/*.()^]/;
const operandsRegexp = /(\+|-|\/|\*|\(|\)|\^)/;
const exprPriority = {
  '(': 0,
  ')': 0,
  '-': 1,
  '+': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

function tokenize(expr) {
  let tokens = [];
  let numStr = '';

  for (let sym of [...expr]) {
    if (operandsRegexp.test(sym)) {
      if (numStr) {
        tokens.push(parseFloat(numStr));
        numStr = '';
      }
      tokens.push(sym);
    } else {
      numStr += sym;
    }
  }

  if (numStr) {
    tokens.push(parseFloat(numStr));
  }

  return tokens;
}

export function parse(expr) {
  // TODO: add sanity checks like '2 2 + 3', now it would be understood as '22+3'
  // TODO: implement more and better checks
  // ignores overflows
  const str = expr.replace(/\s/g, '');

  if (notAllowedSymbolsRegexp.test(str)) {
    throw new Error('Contains incorrect symbols');
  }
  const tokens = tokenize(str);
  let parenCount = 0;
  for (let token of tokens) {
    if (token === '(') {
      parenCount++;
    } else if (token === ')') {
      parenCount--;
      if (parenCount < 0) {
        throw new Error('Wrong parentheses count');
      }
    }
  }
  if (parenCount !== 0) {
    throw new Error('Wrong parentheses count');
  }

  return tokens;
}

export function convertToStackNotation(parsed) {
  let result = [];
  let stack = [];

  for (let item of parsed) {
    // a way to differentiate between operator and operand
    if (typeof item === 'number') {
      result.push(item);
    } else {
      const stackTop = stack[stack.length - 1];
      if (item === '(') {
        stack.push(item);
      } else if (item === ')') {
        while (stackTop.length > 0) {
          const expelled = stack.pop();
          if (expelled === '(') {
            break;
          }
          result.push(expelled);
        }
      } else if (stackTop && exprPriority[stackTop] >= exprPriority[item]) {
        result.push(stack.pop());
        stack.push(item);
      } else {
        stack.push(item);
      }
    }
  }

  while (stack.length > 0) {
    result.push(stack.pop());
  }

  return result;
}

