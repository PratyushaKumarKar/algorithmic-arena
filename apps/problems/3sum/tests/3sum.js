function generateTestCases() {
    const testCases = [];

    // Helper function to generate random integer within a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper function to generate a random array
    function generateRandomArray(length, min, max) {
        return Array.from({ length }, () => getRandomInt(min, max));
    }

    // Helper function to find triplets
    function findTriplets(nums) {
        nums.sort((a, b) => a - b);
        const result = [];
        for (let i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            let left = i + 1;
            let right = nums.length - 1;
            while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];
                if (sum === 0) {
                    result.push([nums[i], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }

    // Generate test cases
    for (let i = 0; i < 50; i++) {
        const length = getRandomInt(3, 3000);
        const nums = generateRandomArray(length, -105, 105);
        const output = findTriplets(nums);
        testCases.push({ input: nums, output: output });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));