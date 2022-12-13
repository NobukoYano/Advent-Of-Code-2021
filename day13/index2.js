/**
 * day X - first
 * @param {Array<Array<string>>} cordinates
 * @param {Array<{key: number}>} folds - key can be x or y
 * @return {number}
 */
const calculate = (cordinates, folds) => {
    const maxY = Math.max(...cordinates.map((el)=>el[0]));
    const maxX = Math.max(...cordinates.map((el)=>el[1]));
    let result = new Array(maxX+1).fill(0).map(()=>new Array(maxY+1).fill(0));
    for (const cordinate of cordinates) {
        if (!result[cordinate[1]]) result[cordinate[1]] = []
        result[cordinate[1]][cordinate[0]] = 1;
    }

    for (const action of folds) {
        result = fold(action[0], action[1], result);
    }
    console.log("#### result", result.map((row)=>row.map((num)=>num === 0 ? "." : "#").join("")));
    return -1;
};

const fold = (direction, num, map) => {
    const foldMap = [];

    if (direction === "y") {

        for (let i = 0; i < map.length; i++ ) { // y cordinate
            for (let j = 0; j < map[0].length; j++) { // x cordinate
                if (i < num) {
                    if (!foldMap[i]) foldMap[i] = []
                    foldMap[i][j] = map[i]? map[i][j] : undefined;
                } else if (i === num) {
                    continue;
                } else {
                    if (!foldMap[num - (i - num)][j]) {
                        foldMap[num - (i - num)][j] = map[i][j];
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < map.length; i++ ) { // y cordinate
            for (let j = 0; j < map[0].length; j++) { // x cordinate
                if (j < num) {
                    if (!foldMap[i]) foldMap[i] = []
                    foldMap[i][j] = map[i]? map[i][j] : undefined;
                } else if (j === num) {
                    continue;
                } else {
                    if (!foldMap[i][num - (j - num)]) {
                        foldMap[i][num - (j - num)] = map[i][j];
                    }
                }
            }
        }
    }
    return foldMap;
}

const fs = require("fs");
const file = fs.readFileSync("./day13/input.txt").toString('utf-8');
const input = file.split("\n");

// Format
const cordinates = [];
const folds = [];

for (const row of input) {
    if (row.startsWith("fold along")) {
        const items = row.replace("fold along ", "").split("=");
        folds.push(items.map((el, i)=>i === 0 ? el : parseInt(el)));
    } else if (row === "") {
    } else {
        cordinates.push(row.split(",").map((el)=>parseInt(el)));
    }
}

console.log(calculate(cordinates, folds));
