
const TYPES = [{open:"(", close: ")"}, {open: "[", close: "]"}, {open: "{", close: "}"}, {open: "<", close: ">"}];

/**
 * day 10 - first
 * @param {Array<Array<string>>} input
 * @return {number}
 */
const calculate = (input) => {
    const totalErrors = [];
    for (const row of input) {
        const errors = []; // {index, is, shouldBe}
        const opening = [];
        for (const [index, char] of row.entries()) {
            // open brackets
            if (TYPES.map((type)=>type.open).includes(char)) {
                opening.push(char);
            }

            // close brackets
            if (TYPES.map((type)=>type.close).includes(char)) {
                const currentType = TYPES.find((el)=>el.close === char);

                // if last opening bracket is round
                if (opening[opening.length - 1] !== currentType.open) {
                    const toBeType = TYPES.find((el)=>el.open === opening[opening.length - 1]);
                    errors.push({error: true, is: char, shouldBe: toBeType.close, index});
                }

                opening.pop();

            }
        }
        if (errors.length) totalErrors.push(errors);
    }
    const count = totalErrors.reduce((acc, curr)=>acc + curr.reduce((acc2, curr2)=>{
        let score = 0;
        if (curr2.is === ")") score = 3;
        if (curr2.is === "]") score = 57;
        if (curr2.is === "}") score = 1197;
        if (curr2.is === ">") score = 25137;
        return acc2 + score;
    }, 0), 0);
    console.log("### total errors", totalErrors)
    return count;
};


const fs = require("fs");
const file = fs.readFileSync("./day10/input.txt").toString('utf-8');
const input = file.split("\n").map((el)=>el.split(""));

console.log(calculate(input));
