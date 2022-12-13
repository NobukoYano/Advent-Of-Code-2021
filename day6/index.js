/**
 * day X - first
 * @param {string} file
 * @param {number} count
 * @return {number}
 */
const calculate = (file, count) => {
    const arr = file.split(",").map((el)=>parseInt(el));
    // console.log(`initial:`, arr);
    for (let i = 0; i < count; i++) {
        let add = 0;
        for (const [index, num] of arr.entries()) {
            if (num === 0) {
                add += 1;
                arr[index] = 6;
            } else {
                arr[index] = num - 1;
            }
        }
        arr.push(...new Array(add).fill(8));
        // console.log(`after ${i+1} days:`, arr);
    }
    return arr.length;
};

const fs = require("fs");
const file = fs.readFileSync("./day6/input.txt").toString('utf-8');

console.log(calculate(file, 80));
