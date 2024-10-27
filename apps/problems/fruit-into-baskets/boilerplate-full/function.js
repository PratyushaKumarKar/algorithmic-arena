
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/fruit-into baskets/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_fruits = parseInt(input.shift() || "0");
        const fruits = input.splice(0, size_fruits).map(x => parseInt(x));
const result = totalFruit(fruits);
console.log(result);
    