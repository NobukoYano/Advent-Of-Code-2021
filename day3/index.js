/**
 * day 3 - first
 * @param {Array<string>} inputs - each element has a same length of string and consists of "0" or "1"
 * @return {number}
 */
const calculate = (inputs) => {
    // Calculate sum of each position
    const sum = Array(inputs[0].length).fill(0);
    for (let el of inputs) {
        for (let i = 0; i < el.length; i++) {
            sum[i] = sum[i] + parseInt(el[i]);
        }
    }
    console.log("#### sum", sum);

    // Convert to the bit numbers
    const result = sum.map((sumElement)=>sumElement < inputs.length/2 ? "0" : "1");
    console.log("#### result", result);

    // Calculate gamma and epsilon
    const gamma = parseInt(result.join(""), 2);
    const epsilon = parseInt(result.map((el)=>el === "0" ? "1" : "0").join(""), 2);
    console.log("####", gamma * epsilon);

    return gamma * epsilon;
};

const fs = require("fs");
const file = fs.readFileSync("./day3/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(calculate(input));
