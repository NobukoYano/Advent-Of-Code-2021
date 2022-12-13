/**
 * day 1 - first
 * @param {Array<number>} texts
 * @return {number}
 */
const calculate = (texts) => {
    // Check the number of items which are bigger than previous value
    let lastNumber = null;
    return texts.reduce((count, current, i)=>{
        if (i !== 0 && lastNumber < parseInt(current)) {
            count++;
        }
        lastNumber = parseInt(current);
        return count;
    }, 0)
};

const fs = require("fs");
const file = fs.readFileSync("./day1/input.txt").toString('utf-8');
const textArray = file.split("\n")

console.log(calculate(textArray));
