
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/isomorphic-strings/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const s = input.shift() || "";
  const t = input.shift() || "";
const result = isIsomorphic(s, t);
console.log(result);
    