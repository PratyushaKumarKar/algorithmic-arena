function generateTestCases() {
  const testCases = [];

  // Basic test cases
  testCases.push({ input: [1,2,1], output: 3 });
  testCases.push({ input: [0,1,2,2], output: 3 });
  testCases.push({ input: [1,2,3,2,2], output: 4 });

  // Edge cases
  testCases.push({ input: [0], output: 1 });
  testCases.push({ input: [0,0,0,0,0], output: 5 });
  testCases.push({ input: [1,2,3,4,5], output: 2 });

  // Random test cases
  for (let i = 0; i < 44; i++) {
    const length = Math.floor(Math.random() * 100000) + 1;
    const fruits = [];
    for (let j = 0; j < length; j++) {
      fruits.push(Math.floor(Math.random() * length));
    }
    const output = calculateOutput(fruits);
    testCases.push({ input: fruits, output: output });
  }

  return testCases;
}

function calculateOutput(fruits) {
  let max = 0;
  let count = 0;
  let first = -1;
  let second = -1;
  let lastFirst = -1;

  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === first || fruits[i] === second) {
      count++;
    } else if (first === -1 || second === -1) {
      if (first === -1) first = fruits[i];
      else second = fruits[i];
      count++;
    } else {
      max = Math.max(max, count);
      count = lastFirst + 1;
      first = fruits[i-1];
      second = fruits[i];
    }

    if (fruits[i] === first) lastFirst = i;
    else lastFirst = i - 1;
  }

  return Math.max(max, count);
}

console.log(JSON.stringify(generateTestCases()));