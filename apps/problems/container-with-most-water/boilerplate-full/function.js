
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/container-with most water/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_height = parseInt(input.shift() || "0");
        const height = input.splice(0, size_height).map(x => parseInt(x));
const result = maxArea(height);
console.log(result);
    