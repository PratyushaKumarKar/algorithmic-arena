
    

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/asteroid-collision/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_asteroids = parseInt(input.shift() || "0");
        const asteroids = input.splice(0, size_asteroids).map(x => parseInt(x));
const result = collision(asteroids);
console.log(result.join(' '));
    