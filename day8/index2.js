/**
 * day 8 - second
 * @param {Array<string>} input
 * @return {number}
 */
const calculate = (input) => {
    let sum = 0;
    for (const row of input) {
        const targetString = [row[11], row[12], row[13], row[14]];
        const decodedNumber = targetString.map((el)=>{
            if (el.length === 2) return 1;
            if (el.length === 4) return 4;
            if (el.length === 3) return 7;
            if (el.length === 7) return 8;
            return decode(row.slice(0, 10), el);

        });
        console.log("###", decodedNumber);
        sum += decodedNumber[0]*1000 + decodedNumber[1]*100 + decodedNumber[2]*10 + decodedNumber[3];
    }
    return sum;
};
/**
 *
 * @param {Array<string>} muster
 * @param {string} target
 */
const decode = (muster, target) =>{
    const length = target.length;
    const one = muster.find((el)=>el.length === 2);
    const four = muster.find((el)=>el.length === 4);
    let diffOneAndFour = "";
    for (let i = 0; i < four.length; i++) {
        if (!one.includes(four[i])) {
            diffOneAndFour += four[i];
        }
    }

    let isThree = true;
    let isSix = false;
    for (let i = 0; i < one.length; i++) {
        if (!target.includes(one[i])) {
            isThree = false;
            isSix = true;
        }
    }

    let isFive = true;
    for (let i = 0; i < diffOneAndFour.length; i++) {
        if (!target.includes(diffOneAndFour[i])) {
            isFive = false;
        }
    }

    let isNine = true;
    for (let i = 0; i < four.length; i++) {
        if (!target.includes(four[i])) {
            isNine = false;
        }
    }

    if (length === 5 && isThree) return 3;
    if (length === 5 && isFive) return 5;
    if (length === 5 && !isFive) return 2;

    if (length === 6 && isSix) return 6;
    if (length === 6 && isNine) return 9;
    return 0;
}

/**
 *
 * @param {Array<string>} muster
 * @param {string} target
 */
const findLength6 = (muster, target) =>{
    const one = muster.find((el)=>el.length === 2);
    const four = muster.find((el)=>el.length === 4);
    let diffOneAndFour = "";
    for (let i = 0; i < four.length; i++) {
        if (!one.includes(four[i])) {
            diffOneAndFour += four[i];
        }
    }

    let isThree = true;
    for (let i = 0; i < one.length; i++) {
        if (!target.includes(one[i])) {
            isThree = false;
        }
    }

    let isFive = true;
    for (let i = 0; i < diffOneAndFour.length; i++) {
        if (!target.includes(diffOneAndFour[i])) {
            isFive = false;
        }
    }
    if (isThree) return 3;
    if (isFive) return 5;
    if (!isFive) return 2;

}

const fs = require("fs");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const input = file.split("\n").map((el)=>el.split(" "))

console.log(calculate(input));
