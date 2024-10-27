function generateTestCases() {
    const testCases = [];

    for (let i = 0; i < 50; i++) {
        const m = Math.floor(Math.random() * 100) + 1;
        const n = Math.floor(Math.random() * 100) + 1;
        const matrix = [];
        let lastNum = -10000;

        for (let j = 0; j < m; j++) {
            const row = [];
            for (let k = 0; k < n; k++) {
                lastNum += Math.floor(Math.random() * 100) + 1;
                row.push(lastNum);
            }
            matrix.push(row);
        }

        const target = Math.floor(Math.random() * 20001) - 10000;
        const output = matrix.flat().includes(target);

        testCases.push({
            input: { matrix, target },
            output
        });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));