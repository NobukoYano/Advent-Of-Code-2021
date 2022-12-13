/**
 * day 11 - first
 * @param {Array<Array<string>>} inputs
 * @param {number} n - number of steps
 * @return {number}
 */
const calculate = (input, n) => {
    let matrix = JSON.parse(JSON.stringify(input));
    let result = 0;
    for (let i = 0; i < n; i++) {
        // add self and adjacent +1
        for (const [rowIndex, row] of matrix.entries()) {
            for (let [colIndex, col] of row.entries()) {
                if (matrix[rowIndex][colIndex] !== "X") {
                    matrix[rowIndex][colIndex] += 1;
                    if (matrix[rowIndex][colIndex] > 9) {
                        matrix[rowIndex][colIndex] = "X"; // sign for flash
                        matrix = flash(matrix, rowIndex, colIndex);
                    }
                }
            }
        }

        // count > 9 octopus and reset to 0
        let count = 0;
        for (const [rowIndex, row] of matrix.entries()) {
            for (let [colIndex, col] of row.entries()) {
                if (col === "X") {
                    matrix[rowIndex][colIndex] = 0;
                    count += 1;
                }
            }
        }
        // console.log(`### Step ${i+1}:`, matrix);
        console.log(`### Step ${i+1}:`, matrix.map((row)=>row.map((char)=>char.toString()).join("")));
        result += count;
    }
    return result;
};

const flash = (matrixOriginal, rowIndex, colIndex) => {
    let matrix = JSON.parse(JSON.stringify(matrixOriginal));
    if (matrix?.[rowIndex-1]?.[colIndex-1] !== undefined && matrix[rowIndex-1][colIndex-1] !== "X") {
        matrix[rowIndex-1][colIndex-1] += 1;
        if (matrix[rowIndex-1][colIndex-1] > 9) {
            matrix[rowIndex-1][colIndex-1] = "X";
            matrix = flash(matrix, rowIndex-1, colIndex-1);
        }
    }
    if (matrix?.[rowIndex-1]?.[colIndex] !== undefined && matrix[rowIndex-1][colIndex] !== "X") {
        matrix[rowIndex-1][colIndex] += 1;
        if (matrix[rowIndex-1][colIndex] > 9) {
            matrix[rowIndex-1][colIndex] = "X";
            matrix = flash(matrix, rowIndex-1, colIndex);
        }
    }
    if (matrix?.[rowIndex-1]?.[colIndex+1] !== undefined && matrix[rowIndex-1][colIndex+1] !== "X") {
        matrix[rowIndex-1][colIndex+1] += 1;
        if (matrix[rowIndex-1][colIndex+1] > 9) {
            matrix[rowIndex-1][colIndex+1] = "X";
            matrix = flash(matrix, rowIndex-1, colIndex+1);
        }
    }
    if (matrix?.[rowIndex]?.[colIndex-1] !== undefined && matrix[rowIndex][colIndex-1] !== "X") {
        matrix[rowIndex][colIndex-1] += 1;
        if (matrix[rowIndex][colIndex-1] > 9) {
            matrix[rowIndex][colIndex-1] = "X";
            matrix = flash(matrix, rowIndex, colIndex-1);
        }
    }
    if (matrix?.[rowIndex]?.[colIndex+1] !== undefined && matrix[rowIndex][colIndex+1] !== "X") {
        matrix[rowIndex][colIndex+1] += 1;
        if (matrix[rowIndex][colIndex+1] > 9) {
            matrix[rowIndex][colIndex+1] = "X";
            matrix = flash(matrix, rowIndex, colIndex+1);
        }
    }
    if (matrix?.[rowIndex+1]?.[colIndex-1] !== undefined && matrix[rowIndex+1][colIndex-1] !== "X") {
        matrix[rowIndex+1][colIndex-1] += 1;
        if (matrix[rowIndex+1][colIndex-1] > 9) {
            matrix[rowIndex+1][colIndex-1] = "X";
            matrix = flash(matrix, rowIndex+1, colIndex-1);
        }
    }
    if (matrix?.[rowIndex+1]?.[colIndex] !== undefined && matrix[rowIndex+1][colIndex] !== "X") {
        matrix[rowIndex+1][colIndex] += 1;
        if (matrix[rowIndex+1][colIndex] > 9) {
            matrix[rowIndex+1][colIndex] = "X";
            matrix = flash(matrix, rowIndex+1, colIndex);
        }
    }
    if (matrix?.[rowIndex+1]?.[colIndex+1] !== undefined && matrix[rowIndex+1][colIndex+1] !== "X") {
        matrix[rowIndex+1][colIndex+1] += 1;
        if (matrix[rowIndex+1][colIndex+1] > 9) {
            matrix[rowIndex+1][colIndex+1] = "X";
            matrix = flash(matrix, rowIndex+1, colIndex+1);
        }
    }

    return matrix;
}

const fs = require("fs");
const file = fs.readFileSync("./day11/input.txt").toString('utf-8');
const input = file.split("\n").map((el)=>el.split("").map((char)=>parseInt(char)));

console.log(calculate(input, 100));
