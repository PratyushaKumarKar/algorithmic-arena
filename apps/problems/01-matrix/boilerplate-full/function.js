
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/01-matrix/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_mat_outer = parseInt(input.shift() || "0");
        const mat = [];
        for (let i = 0; i < size_mat_outer; i++) {
          const size_mat_inner = parseInt(input.shift() || "0");
          mat.push(input.splice(0, size_mat_inner).map(x => parseInt(x)));
        }
const result = matrix(mat);
result.forEach(row => console.log(row.join(' ')));
    