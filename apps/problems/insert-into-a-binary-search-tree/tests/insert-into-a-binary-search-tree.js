function generateTestCases() {
  const testCases = [];

  function generateRandomTree(size) {
    const values = new Set();
    while (values.size < size) {
      values.add(Math.floor(Math.random() * 217 - 108));
    }
    return Array.from(values);
  }

  function generateRandomValue() {
    return Math.floor(Math.random() * 217 - 108);
  }

  for (let i = 0; i < 50; i++) {
    const treeSize = Math.floor(Math.random() * 100);
    const tree = generateRandomTree(treeSize);
    let val;
    do {
      val = generateRandomValue();
    } while (tree.includes(val));

    testCases.push({
      input: { root: tree, val: val },
      output: [...tree, val].sort((a, b) => a - b)
    });
  }

  return testCases;
}

console.log(JSON.stringify(generateTestCases()));