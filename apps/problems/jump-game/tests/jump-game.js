function generateTestCases() {
    const testCases = [];

    // Helper function to generate random array
    function generateRandomArray(length, maxJump) {
        return Array.from({ length }, () => Math.floor(Math.random() * (maxJump + 1)));
    }

    // Test case 1: Example 1
    testCases.push({ input: [2,3,1,1,4], output: true });

    // Test case 2: Example 2
    testCases.push({ input: [3,2,1,0,4], output: false });

    // Test case 3: Minimum length array, can jump
    testCases.push({ input: [1], output: true });

    // Test case 4: Minimum length array, can't jump
    testCases.push({ input: [0], output: true });

    // Test case 5: Maximum length array, all zeros except last
    testCases.push({ input: Array(10000).fill(0).concat([1]), output: false });

    // Test case 6: Maximum length array, all ones
    testCases.push({ input: Array(10000).fill(1), output: true });

    // Test case 7: Maximum length array, alternating 0 and 1
    testCases.push({ input: Array(10000).fill(0).map((_, i) => i % 2), output: false });

    // Test case 8: Maximum jump at first position
    testCases.push({ input: [10000].concat(Array(9999).fill(0)), output: true });

    // Test case 9: Decreasing sequence
    testCases.push({ input: [5,4,3,2,1,0], output: true });

    // Test case 10: Increasing sequence
    testCases.push({ input: [1,2,3,4,5], output: true });

    // Generate 40 random test cases
    for (let i = 0; i < 40; i++) {
        const length = Math.floor(Math.random() * 10000) + 1;
        const maxJump = Math.floor(Math.random() * 100000);
        const input = generateRandomArray(length, maxJump);
        
        // Determine if it's possible to reach the end
        let maxReach = 0;
        let canReachEnd = false;
        for (let j = 0; j <= maxReach && j < input.length; j++) {
            maxReach = Math.max(maxReach, j + input[j]);
            if (maxReach >= input.length - 1) {
                canReachEnd = true;
                break;
            }
        }
        
        testCases.push({ input, output: canReachEnd });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));