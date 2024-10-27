function generateTestCases() {
  const testCases = [];

  for (let i = 0; i < 50; i++) {
    const listLength = Math.floor(Math.random() * 999) + 2; // Random length between 2 and 1000
    const list = [];
    const usedValues = new Set();

    // Generate unique random values for the list
    for (let j = 0; j < listLength; j++) {
      let value;
      do {
        value = Math.floor(Math.random() * 2001) - 1000; // Random value between -1000 and 1000
      } while (usedValues.has(value));
      usedValues.add(value);
      list.push(value);
    }

    // Select a random node to delete (not the last one)
    const nodeToDeleteIndex = Math.floor(Math.random() * (listLength - 1));
    const nodeToDelete = list[nodeToDeleteIndex];

    // Create the expected output by removing the node to delete
    const output = [...list.slice(0, nodeToDeleteIndex), ...list.slice(nodeToDeleteIndex + 1)];

    testCases.push({
      input: {
        head: list,
        node: nodeToDelete
      },
      output: output
    });
  }

  return testCases;
}

console.log(JSON.stringify(generateTestCases()));