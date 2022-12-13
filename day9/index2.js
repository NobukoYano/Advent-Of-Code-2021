/**
 * day 9 - second
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
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                } else if (j === row.length - 1) {
                    if ((char < row[j-1]) && (char < input[i+1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                } else {
                    if ((char < row[j+1]) && (char < row[j-1]) && (char < input[i+1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                }

            } else if (i === input.length - 1 ) {
                if (j === 0) {
                    if ((char < row[j+1]) && (char < input[i-1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                } else if (j === row.length - 1) {
                    if ((char < row[j-1]) && (char < input[i-1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                } else {
                    if ((char < row[j+1]) && (char < row[j-1]) && (char < input[i-1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                }
            } else {
                if (j === 0) {
                    if ((char < row[j+1]) && (char < input[i-1][j]) && (char < input[i+1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                } else if (j === input.length - 1) {
                    if ((char < row[j-1]) && (char < input[i-1][j]) && (char < input[i+1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                } else {
                    if ((char < row[j+1]) && (char < row[j-1]) && (char < input[i-1][j]) && (char < input[i+1][j])) {
                        const basins = calcNumberOfBasins(input, i, j);
                        lowPoints.push({i,j,char, basins: [...new Set(basins.map((el)=>el.join("")))]});
                    }
                }
            }
        }
    }
    lowPoints.sort((a, b)=>b.basins.length - a.basins.length);
    console.log("### lowPoints", lowPoints);
    return lowPoints[0].basins.length * lowPoints[1].basins.length * lowPoints[2].basins.length;
    // return lowPoints.map((el)=>el.char).reduce((acc, char)=>acc + parseInt(char)+1, 0);
};

const calcNumberOfBasins = (input, i, j) => {
    const basins = [];

    if (input[i][j] !== "9") {
        basins.push([i, j]);
    }

    // left
    if (i !== 0 && input[i][j] < input[i-1][j] && input[i-1][j] !== "9") {
        basins.push([i-1, j]);
        basins.push(...calcNumberOfBasins(input, i-1, j));
    }
    // right
    if (i !== input.length - 1 && input[i][j] < input[i+1][j] && input[i+1][j] !== "9") {
        basins.push([i+1, j]);
        basins.push(...calcNumberOfBasins(input, i+1, j));
    }
    // top
    if (j !== 0 && input[i][j] < input[i][j-1] && input[i][j-1] !== "9") {
        basins.push([i, j-1]);
        basins.push(...calcNumberOfBasins(input, i, j-1));
    }

    // down
    if (j !== input[0].length - 1 && input[i][j] < input[i][j+1] && input[i][j+1] !== "9") {
        basins.push([i, j+1]);
        basins.push(...calcNumberOfBasins(input, i, j+1));
    }

    return basins;
}

const fs = require("fs");
const file = fs.readFileSync("./day9/input.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split(""));

console.log(calculate(input));
