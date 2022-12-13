/**
 * day 9 - first
 * @param {Array<Array<string>>} input
 * @return {number}
 */
const calculate = (input) => {
    const lowPoints = [];
    for (const [i, row] of input.entries()) {
        for (const [j, char] of row.entries()) {

            if (i === 0) {
                // corner
                if (j === 0) {
                    if ((char < row[j+1]) && (char < input[i+1][j])) {
                        lowPoints.push(char);
                    }
                } else if (j === row.length - 1) {
                    if ((char < row[j-1]) && (char < input[i+1][j])) {
                        lowPoints.push(char);
                    }
                } else {
                    if ((char < row[j+1]) && (char < row[j-1]) && (char < input[i+1][j])) {
                        lowPoints.push(char);
                    }
                }

            } else if (i === input.length - 1 ) {
                if (j === 0) {
                    if ((char < row[j+1]) && (char < input[i-1][j])) {
                        lowPoints.push(char);
                    }
                } else if (j === row.length - 1) {
                    if ((char < row[j-1]) && (char < input[i-1][j])) {
                        lowPoints.push(char);
                    }
                } else {
                    if ((char < row[j+1]) && (char < row[j-1]) && (char < input[i-1][j])) {
                        lowPoints.push(char);
                    }
                }
            } else {
                if (j === 0) {
                    if ((char < row[j+1]) && (char < input[i-1][j]) && (char < input[i+1][j])) {
                        lowPoints.push(char);
                    }
                } else if (j === input.length - 1) {
                    if ((char < row[j-1]) && (char < input[i-1][j]) && (char < input[i+1][j])) {
                        lowPoints.push(char);
                    }
                } else {
                    if ((char < row[j+1]) && (char < row[j-1]) && (char < input[i-1][j]) && (char < input[i+1][j])) {
                        lowPoints.push(char);
                    }
                }
            }
        }
    }
    console.log("### lowPoints", lowPoints);
    return lowPoints.reduce((acc, char)=>acc + parseInt(char)+1, 0);
};

const fs = require("fs");
const file = fs.readFileSync("./day9/sample.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split(""));

console.log(calculate(input));
