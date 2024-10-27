
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/word-search/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_board_outer = parseInt(input.shift() || "0");
        const board = [];
        for (let i = 0; i < size_board_outer; i++) {
          const size_board_inner = parseInt(input.shift() || "0");
          board.push(input.splice(0, size_board_inner).map(x => x.charAt(0)));
        }
  const word = input.shift() || "";
const result = exist(board, word);
console.log(result);
    