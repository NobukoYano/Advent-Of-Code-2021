
const TYPES = [{open:"(", close: ")"}, {open: "[", close: "]"}, {open: "{", close: "}"}, {open: "<", close: ">"}];

/**
 * day 10 - second
 * @param {Array<Array<string>>} input
 * @return {number}
 */
const calculate = (input) => {
    const incompleteLines = [];
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

        if (!errors.length) incompleteLines.push(opening.reverse());
    }
    const sumArrays = incompleteLines.map((row)=>row.reduce((acc, curr)=>{
            let score = 0;
            if (curr === "(") score = 1;
            if (curr === "[") score = 2;
            if (curr === "{") score = 3;
            if (curr === "<") score = 4;
            const sum = acc * 5 + score;
            return sum;
        }, 0));
    sumArrays.sort((a,b)=> a - b);
    return sumArrays[(sumArrays.length - 1)/2];
};


const fs = require("fs");
const file = fs.readFileSync("./day10/input.txt").toString('utf-8');
const input = file.split("\n").map((el)=>el.split(""));

console.log(calculate(input));
