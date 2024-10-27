function generateTestCases() {
    const testCases = [];

    // Helper function to calculate trapped water
    function trap(height) {
        let left = 0, right = height.length - 1;
        let leftMax = 0, rightMax = 0;
        let water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        return water;
    }

    // Test case 1: Example 1 from the problem description
    testCases.push({
        input: [0,1,0,2,1,0,1,3,2,1,2,1],
        output: 6
    });

    // Test case 2: Example 2 from the problem description
    testCases.push({
        input: [4,2,0,3,2,5],
        output: 9
    });

    // Test case 3: No water can be trapped
    testCases.push({
        input: [1,2,3,4,5],
        output: 0
    });

    // Test case 4: Single element
    testCases.push({
        input: [5],
        output: 0
    });

    // Test case 5: Two elements
    testCases.push({
        input: [5,2],
        output: 0
    });

    // Generate 45 more random test cases
    for (let i = 0; i < 45; i++) {
        const length = Math.floor(Math.random() * 20000) + 1; // Random length between 1 and 20000
        const height = Array(length).fill(0).map(() => Math.floor(Math.random() * 100000)); // Random heights between 0 and 99999
        testCases.push({
            input: height,
            output: trap(height)
        });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));