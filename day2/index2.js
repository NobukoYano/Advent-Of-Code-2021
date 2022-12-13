/**
 * day 2 - second
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (inputs) => {
    // calculate horizontal and depth
    let aim = 0;
    const position = inputs.reduce((acc, item)=>{
        const [direction, number] = item.split(" ");
        if (direction === "forward") {
            acc.horizontal = acc.horizontal + parseInt(number);
            acc.depth = acc.depth + aim * parseInt(number);
        }
        if (direction === "down") {
            aim = aim + parseInt(number);
        }

        if (direction === "up") {
            aim = aim - parseInt(number);
        }
        return acc;

    }, {horizontal: 0, depth: 0});
    console.log("### position", position);
    return position.horizontal * position.depth;

};

const fs = require("fs");
const file = fs.readFileSync("./day2/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(calculate(input));
