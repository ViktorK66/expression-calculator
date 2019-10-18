function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let brackets = [];
  let arraySymbols = expr.match(/\d+|\+|\-|\(|\)|\*|\//g);
  function calculate(expr) {
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] == '*' || expr[i] == '/') {
        if (expr[i] == '*') expr[i-1] = Number(expr[i-1]) * Number(expr[i+1]);
        else {
          if (Number(expr[i+1]) == 0) throw TypeError('TypeError: Division by zero.');
          expr[i-1] = Number(expr[i-1]) / Number(expr[i+1]);
        }
        expr.splice(i, 2);
        i--;
      }
    }
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] == '+' || expr[i] == '-') {
        if (expr[i] == '+')  expr[i-1] = Number(expr[i-1]) + Number(expr[i+1]);
        else expr[i-1] = Number(expr[i-1]) - Number(expr[i+1]);
        expr.splice(i, 2);
        i--;
      }
    }
    return expr[0];
  }
  for (let i = 0; i < arraySymbols.length; i++) {
    if (arraySymbols[i] == '(') brackets.push(i);
    else if (arraySymbols[i] == ')') {
      let start = brackets.pop();
      if (start == undefined) throw Error('ExpressionError: Brackets must be paired');
      let length = i - start - 1;
      arraySymbols.splice(i, 1);
      arraySymbols[start] = calculate(arraySymbols.splice(start + 1, length));
      i = i - length - 1;
    }
  }
  if (brackets.length) throw Error('ExpressionError: Brackets must be paired');
  return calculate(arraySymbols);
}

module.exports = {
    expressionCalculator
}