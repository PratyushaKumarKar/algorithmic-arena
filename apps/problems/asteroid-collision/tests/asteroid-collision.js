function generateTestCases() {
    const testCases = [];

    // Basic test cases
    testCases.push({ input: [5, 10, -5], output: [5, 10] });
    testCases.push({ input: [8, -8], output: [] });
    testCases.push({ input: [10, 2, -5], output: [10] });
    testCases.push({ input: [-2, -1, 1, 2], output: [-2, -1, 1, 2] });
    testCases.push({ input: [-2, -2, 1, -2], output: [-2, -2, -2] });

    // Edge cases
    testCases.push({ input: [1, 1, 1, 1], output: [1, 1, 1, 1] });
    testCases.push({ input: [-1, -1, -1, -1], output: [-1, -1, -1, -1] });
    testCases.push({ input: [1000, -1000], output: [] });
    testCases.push({ input: [-1000, 1000], output: [-1000, 1000] });

    // Complex scenarios
    testCases.push({ input: [5, 10, -5, 8, -8, 3, -3], output: [5, 10] });
    testCases.push({ input: [-5, 10, 5, -10, 8, -8], output: [10] });
    testCases.push({ input: [1, -1, -2, -2, 1, 2], output: [-2, -2, 1, 2] });
    testCases.push({ input: [-2, -1, 1, 2, -2, 2], output: [-2, -1, 1, 2] });
    testCases.push({ input: [1, 2, 3, -3, -2, -1], output: [1, 2] });

    // Random test cases
    for (let i = 0; i < 35; i++) {
        const length = Math.floor(Math.random() * 99) + 2; // 2 to 100
        const asteroids = [];
        for (let j = 0; j < length; j++) {
            let asteroid;
            do {
                asteroid = Math.floor(Math.random() * 2001) - 1000; // -1000 to 1000
            } while (asteroid === 0);
            asteroids.push(asteroid);
        }
        testCases.push({ input: asteroids, output: simulateCollision(asteroids) });
    }

    return testCases;
}

function simulateCollision(asteroids) {
    const stack = [];
    for (const asteroid of asteroids) {
        let destroyed = false;
        while (stack.length > 0 && asteroid < 0 && stack[stack.length - 1] > 0) {
            if (stack[stack.length - 1] < -asteroid) {
                stack.pop();
                continue;
            } else if (stack[stack.length - 1] === -asteroid) {
                stack.pop();
            }
            destroyed = true;
            break;
        }
        if (!destroyed) {
            stack.push(asteroid);
        }
    }
    return stack;
}

console.log(JSON.stringify(generateTestCases()));