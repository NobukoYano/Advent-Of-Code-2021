/**
 * day X - first
 * @param {string} file
 * @param {number} count
 * @return {number}
 */
const calculate = (file, count) => {
    const start = new Date();

    const arr = file.split(",").map((el)=>parseInt(el));
    const result = [arr.map((el)=>({number: el, amount: 1}))];

    // console.log(`initial:`, arr);
    for (let i = 0; i < count; i++) {
        let add = 0;
        for (const [index1, _] of result.entries()) {
            for (const [index2, el] of result[index1].entries()) {
                if (el.number === 0) {
                    add += el.amount;
                    result[index1][index2].number = 6;
                } else {
                    result[index1][index2].number = el.number - 1;
                }
            }
        }

        const currentLength = result.length;
        if (add) {
            result[currentLength] = [];
            result[currentLength].push({number: 8, amount: add});
        }
        console.log(`#### ${i} days/ ${add} laternefish added`);
    }
    const end = new Date();
    console.log("#### Performance:  " + (end - start) / 1000 + " seconds.");
    return result.reduce((acc, current)=> acc + current.reduce((acc2, current2)=>acc2 + current2.amount, 0), 0);
};

const fs = require("fs");
const file = fs.readFileSync("./day6/input.txt").toString('utf-8');

// start with `node --max-old-space-size=8192 day6/index2.js`
console.log(calculate(file, 256));
