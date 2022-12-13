/**
 * day 8 - first
 * @param {Array<string>} input
 * @return {number}
 */
const calculate = (input) => {
    const targetLength = [2, 3, 4, 7];
    let counter = 0;
    for (const row of input) {
        for (let i = row.indexOf("|") + 1; i < row.length; i++) {
            if (targetLength.includes(row[i].length)) {
                counter += 1;
            }
        }
    }
    return counter;
};

const fs = require("fs");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const input = file.split("\n").map((el)=>el.split(" "))

console.log(calculate(input));
