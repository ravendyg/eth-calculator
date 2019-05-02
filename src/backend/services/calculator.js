const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));

async function calculate(expression) {
  let stack = [];

  for (let item of expression) {
    if (typeof item === 'number') {
      stack.push(item);
    } else {
      if (stack.length < 2) {
        throw new Error('Invalid expression');
      }
      const opRight = stack.pop();
      const opLeft = stack.pop();
      let intermediate;

      switch (item) {
        case '-': {
          intermediate = opLeft - opRight;
          break;
        }

        case '+': {
          intermediate = opLeft + opRight;
          break;
        }

        case '*': {
          intermediate = opLeft * opRight;
          break;
        }

        case '/': {
          if (opRight === 0) {
            throw new Error('Division by zero');
          }
          intermediate = opLeft / opRight;
          break;
        }

        case '^': {
          intermediate = opLeft ** opRight;
          break;
        }

        default:
          throw new Error('Unknow operator');
      }

      stack.push(intermediate);
    }
  }

  if (stack.length !== 1) {
    throw new Error('Invalid expression');
  }

  return stack[0];
}

module.exports = {
  calculate,
};
