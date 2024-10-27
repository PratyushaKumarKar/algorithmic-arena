function generateTestCases() {
    const testCases = [];

    function generateRandomArray(length) {
        return Array.from({ length }, () => Math.floor(Math.random() * 20001) - 10000);
    }

    function findKthLargest(nums, k) {
        return nums.sort((a, b) => b - a)[k - 1];
    }

    // Edge cases
    testCases.push({ input: { nums: [1], k: 1 }, output: 1 });
    testCases.push({ input: { nums: [1, 2], k: 1 }, output: 2 });
    testCases.push({ input: { nums: [1, 2], k: 2 }, output: 1 });
    testCases.push({ input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, output: 5 });
    testCases.push({ input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, output: 4 });

    // Random test cases
    for (let i = 0; i < 45; i++) {
        const length = Math.floor(Math.random() * 100000) + 1;
        const nums = generateRandomArray(length);
        const k = Math.floor(Math.random() * length) + 1;
        const output = findKthLargest(nums.slice(), k);
        testCases.push({ input: { nums, k }, output });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));