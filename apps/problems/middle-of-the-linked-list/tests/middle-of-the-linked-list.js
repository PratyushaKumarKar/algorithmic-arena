function generateTestCases() {
    const testCases = [];

    function generateLinkedList(length) {
        const values = Array.from({ length }, (_, i) => Math.floor(Math.random() * 100) + 1);
        return values;
    }

    function getMiddleNode(list) {
        const middleIndex = Math.floor(list.length / 2);
        return list.slice(middleIndex);
    }

    for (let i = 0; i < 50; i++) {
        const length = Math.floor(Math.random() * 100) + 1;
        const input = generateLinkedList(length);
        const output = getMiddleNode(input);

        testCases.push({
            input: input,
            output: output
        });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));