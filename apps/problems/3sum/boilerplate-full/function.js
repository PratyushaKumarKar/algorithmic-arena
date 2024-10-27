
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/3sum/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_nums = parseInt(input.shift() || "0");
        const nums = input.splice(0, size_nums).map(x => parseInt(x));
const result = threeSum(nums);
result.forEach(row => console.log(row.join(' ')));
    