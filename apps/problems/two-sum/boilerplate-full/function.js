//##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
  const num1 = parseInt(input.shift() || "0");
  const num2 = parseInt(input.shift() || "0");
  const result = sum(num1, num2);
  console.log(result);
    