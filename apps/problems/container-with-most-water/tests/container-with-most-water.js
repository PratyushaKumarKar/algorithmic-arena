function generateTestCases() {
    const testCases = [];

    // Helper function to generate random array
    function generateRandomArray(length, max) {
        return Array.from({ length }, () => Math.floor(Math.random() * max));
    }

    // Helper function to calculate max area
    function maxArea(height) {
        let left = 0;
        let right = height.length - 1;
        let maxArea = 0;

        while (left < right) {
            const area = Math.min(height[left], height[right]) * (right - left);
            maxArea = Math.max(maxArea, area);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }

    // Generate test cases
    for (let i = 0; i < 50; i++) {
        let length, height;

        if (i === 0) {
            height = [1, 8, 6, 2, 5, 4, 8, 3, 7]; // Example 1
        } else if (i === 1) {
            height = [1, 1]; // Example 2
        } else if (i < 5) {
            length = 2;
            height = generateRandomArray(length, 10000);
        } else if (i < 10) {
            length = Math.floor(Math.random() * 9) + 2; // 2 to 10
            height = generateRandomArray(length, 100);
        } else if (i < 20) {
            length = Math.floor(Math.random() * 91) + 10; // 10 to 100
            height = generateRandomArray(length, 1000);
        } else if (i < 30) {
            length = Math.floor(Math.random() * 901) + 100; // 100 to 1000
            height = generateRandomArray(length, 5000);
        } else if (i < 40) {
            length = Math.floor(Math.random() * 9001) + 1000; // 1000 to 10000
            height = generateRandomArray(length, 8000);
        } else {
            length = Math.floor(Math.random() * 90001) + 10000; // 10000 to 100000
            height = generateRandomArray(length, 10000);
        }

        const output = maxArea(height);
        testCases.push({ input: height, output: output });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));