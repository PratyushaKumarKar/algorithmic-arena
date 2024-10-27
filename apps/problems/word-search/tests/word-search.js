function generateTestCases() {
    const testCases = [];

    function generateBoard(m, n) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length: m }, () =>
            Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)])
        );
    }

    function generateWord(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    // Test case 1-10: Small boards with short words
    for (let i = 0; i < 10; i++) {
        const m = Math.floor(Math.random() * 3) + 1;
        const n = Math.floor(Math.random() * 3) + 1;
        const board = generateBoard(m, n);
        const word = generateWord(Math.floor(Math.random() * 5) + 1);
        testCases.push({ input: { board, word }, output: null });
    }

    // Test case 11-20: Medium boards with medium words
    for (let i = 0; i < 10; i++) {
        const m = Math.floor(Math.random() * 3) + 3;
        const n = Math.floor(Math.random() * 3) + 3;
        const board = generateBoard(m, n);
        const word = generateWord(Math.floor(Math.random() * 5) + 5);
        testCases.push({ input: { board, word }, output: null });
    }

    // Test case 21-30: Large boards with long words
    for (let i = 0; i < 10; i++) {
        const m = Math.floor(Math.random() * 2) + 5;
        const n = Math.floor(Math.random() * 2) + 5;
        const board = generateBoard(m, n);
        const word = generateWord(Math.floor(Math.random() * 5) + 10);
        testCases.push({ input: { board, word }, output: null });
    }

    // Test case 31-40: Edge cases
    testCases.push({ input: { board: [['A']], word: 'A' }, output: true });
    testCases.push({ input: { board: [['A']], word: 'B' }, output: false });
    testCases.push({ input: { board: [['A', 'B'], ['C', 'D']], word: 'ABCD' }, output: false });
    testCases.push({ input: { board: [['A', 'B'], ['C', 'D']], word: 'ACBD' }, output: true });
    testCases.push({ input: { board: generateBoard(6, 6), word: generateWord(15) }, output: null });
    testCases.push({ input: { board: generateBoard(1, 6), word: generateWord(6) }, output: null });
    testCases.push({ input: { board: generateBoard(6, 1), word: generateWord(6) }, output: null });
    testCases.push({ input: { board: [['A', 'A', 'A'], ['A', 'A', 'A'], ['A', 'A', 'A']], word: 'AAAAAAAAA' }, output: true });
    testCases.push({ input: { board: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']], word: 'ABCDEFGHI' }, output: false });
    testCases.push({ input: { board: [['A']], word: '' }, output: true });

    // Test case 41-50: Random cases
    for (let i = 0; i < 10; i++) {
        const m = Math.floor(Math.random() * 6) + 1;
        const n = Math.floor(Math.random() * 6) + 1;
        const board = generateBoard(m, n);
        const word = generateWord(Math.floor(Math.random() * 15) + 1);
        testCases.push({ input: { board, word }, output: null });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));