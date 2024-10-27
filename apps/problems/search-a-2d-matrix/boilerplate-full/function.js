
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/search-a 2d matrix/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_matrix_outer = parseInt(input.shift() || "0");
        const matrix = [];
        for (let i = 0; i < size_matrix_outer; i++) {
          const size_matrix_inner = parseInt(input.shift() || "0");
          matrix.push(input.splice(0, size_matrix_inner).map(x => parseInt(x)));
        }
  const target = parseInt(input.shift() || "0");
const result = searchMatrix(matrix, target);
console.log(result);
    