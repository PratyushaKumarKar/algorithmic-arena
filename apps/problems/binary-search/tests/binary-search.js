function generateTestCases() {
    const testCases = [];

    // Helper function to generate random sorted array
    function generateSortedArray(length, min, max) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return arr.sort((a, b) => a - b);
    }

    // Helper function to perform binary search
    function binarySearch(nums, target) {
        let left = 0;
        let right = nums.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    for (let i = 0; i < 50; i++) {
        const length = Math.floor(Math.random() * 10000) + 1;
        const nums = generateSortedArray(length, -10000, 10000);
        const target = Math.floor(Math.random() * 20001) - 10000;

        const input = { nums, target };
        const output = binarySearch(nums, target);

        testCases.push({ input, output });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));