const notAllowedSymbolsRegexp = /[^0-9+-:*,.()]/;
const operandsRegexp = /(\+|-|:|\*|\(|\))/;

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

  return tokens;
}

export function parse(expr) {
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
  return [];
}

