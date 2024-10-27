
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/valid-anagram/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const s = input.shift() || "";
  const t = input.shift() || "";
const result = isAnagram(s, t);
console.log(result);
    