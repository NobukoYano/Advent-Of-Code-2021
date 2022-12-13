/**
 * day X - first
 * @param {Array<number>} input
 * @return {number}
 */
const calculate = (input) => {

    const result = {
        fuelNeeded: 99999999999,
        position: null
    };
    let max = Math.max(...input);
    let min = Math.min(...input);
    for (let i = min; i < max; i++) {
        let fuelNeeded = 0;
        for (let j = 0; j < input.length; j++) {
            fuelNeeded += Math.abs(input[j] - i);
        }
        if (result.fuelNeeded > fuelNeeded) {
            result.fuelNeeded = fuelNeeded;
            result.position = i;
        }
    }
   return result;
};

const fs = require("fs");
const file = fs.readFileSync("./day7/input.txt").toString('utf-8');
const input = file.split(",").map((el)=>parseInt(el));

console.log(calculate(input));
