/**
 * filter the array according to the position to be determined and the rule
 * @param {Array<string>} array
 * @param {number} position
 * @param {"oxigen" | "co2"} rule
 * @param {number} maxPosition
 * @return {String}
 */
const customFilter = (array, position, rule, maxPosition) => {
    if (array.length === 1) return array[0];
    if (position > maxPosition) return "ERR";

    const sum = array.reduce((acc,current)=>acc + parseInt(current[position]), 0);
    const result = rule === "oxigen" ? (sum >= array.length/2) : !(sum >= array.length/2);
    const resultBit = result ? "1" : "0";
    return customFilter(array.filter((element)=>element[position] === resultBit), position+1, rule);
};

/**
 * day 3 - second
 * @param {Array<number>} inputs
 */
const calculate = (inputs) => {

    // Calculate oxigen and co2
    const oxigen = customFilter(inputs, 0, "oxigen", inputs[0].length);
    const co2 = customFilter(inputs, 0, "co2", inputs[0].length);

    console.log("####", oxigen, co2);

    if (oxigen === "ERR" || co2 === "ERR") return -1
    return parseInt(oxigen, 2) * parseInt(co2, 2);
};


const fs = require("fs");
const file = fs.readFileSync("./day3/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(calculate(input));
