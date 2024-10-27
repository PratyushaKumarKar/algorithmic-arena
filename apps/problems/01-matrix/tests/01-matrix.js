function generateTestCases() {
    const testCases = [];

    // Helper function to generate random matrix
    function generateMatrix(m, n) {
        const matrix = [];
        let hasZero = false;
        for (let i = 0; i < m; i++) {
            const row = [];
            for (let j = 0; j < n; j++) {
                const val = Math.random() < 0.3 ? 0 : 1;
                if (val === 0) hasZero = true;
                row.push(val);
            }
            matrix.push(row);
        }
        if (!hasZero) matrix[0][0] = 0;
        return matrix;
    }

    // Helper function to calculate distance matrix
    function calculateDistance(mat) {
        const m = mat.length;
        const n = mat[0].length;
        const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
        const queue = [];

        // Find all 0s and initialize their distances
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 0) {
                    dist[i][j] = 0;
                    queue.push([i, j]);
                }
            }
        }

        // BFS to calculate distances
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        while (queue.length > 0) {
            const [i, j] = queue.shift();
            for (const [di, dj] of dirs) {
                const ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] > dist[i][j] + 1) {
                    dist[ni][nj] = dist[i][j] + 1;
                    queue.push([ni, nj]);
                }
            }
        }

        return dist;
    }

    // Generate test cases
    for (let i = 0; i < 50; i++) {
        const m = Math.floor(Math.random() * 10) + 1;
        const n = Math.floor(Math.random() * 10) + 1;
        const input = generateMatrix(m, n);
        const output = calculateDistance(input);
        testCases.push({ input, output });
    }

    return testCases;
}

console.log(JSON.stringify(generateTestCases()));