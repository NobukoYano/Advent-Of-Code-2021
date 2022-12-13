/**
 * day2 - second
 * @param {Array<number>} texts
 * @return {number}
 */
const calculate = (texts) => {
    // create array of sum
    const sumArray = [];
    for (let i = 2; i < texts.length; i++) {
        sumArray.push(parseInt(texts[i-2])+parseInt(texts[i-1])+parseInt(texts[i]));
    }

    // Check the number of items which are bigger than previous value
    let previous = null;
    return sumArray.reduce((count, current, i)=>{
        if (i !== 0 && previous < parseInt(current)) {
            count++;
        }
        previous = parseInt(current);
        return count;
    }, 0)
};

const fs = require("fs");
const file = fs.readFileSync("./day1/input.txt").toString('utf-8');
const textArray = file.split("\n")

console.log(calculate(textArray));
