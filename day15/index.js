/**
 * day 15 - first
 * @param {Array<string>} input
 * @return {number}
 */
const calculate = (input) => {
    console.log("###", input);
    const start = Date.now();

    // create all pattern of routes
    const initSum = checkMinimumRisk(0, 0, 0, input[0].length-1, input.length-1, input, 90000, true, 90000); // 9 * 100 * 100
    console.log("### Init risk:", initSum);

    const minSum = checkMinimumRisk(0, 0, 0, input[0].length-1, input.length-1, input, 90000, false, initSum); // 9 * 100 * 100
    console.log("### Min risk:", minSum);

    const end = Date.now();
    console.log("### performance in sec:", (end-start)/1000);
    return -1;
};

const checkMinimumRisk = (sum, x, y, maxX, maxY, input, minSum, isInit, maxSum) => {
    if (x >= maxX && y >= maxY) {
        if (sum < minSum) return sum;
        return minSum;
    } else if (x >= maxX) {
        const yAdd = y+1;
        if ((sum+input[yAdd][x]) < maxSum) {
            return checkMinimumRisk(sum+input[yAdd][x], x, yAdd, maxX, maxY, input, minSum, isInit, maxSum);
        } else {
            return minSum;
        }

    } else if (y >= maxY) {
        const xAdd = x+1;
        if ((sum+input[y][xAdd]) < maxSum) {
            return checkMinimumRisk(sum + input[y][xAdd], xAdd, y, maxX, maxY, input, minSum, isInit, maxSum);
        } else {
            return minSum;
        }
    } else {
        const xAdd = x+1;
        const yAdd = y+1;
        if (isInit) {
            if (input[yAdd][x] <= (input[y][xAdd])) {
                return checkMinimumRisk(sum+input[y][xAdd], xAdd, y, maxX, maxY, input, minSum, isInit, maxSum);
            } else {
                return checkMinimumRisk(sum + input[yAdd][x], x, yAdd, maxX, maxY, input, minSum, isInit, maxSum);
            }
        } else {
            if ((sum+input[yAdd][x]) < maxSum && (sum+input[y][xAdd] < maxSum)) {
                return Math.min(checkMinimumRisk(sum+input[yAdd][x], x, yAdd, maxX, maxY, input, minSum, isInit, maxSum), checkMinimumRisk(sum+input[y][xAdd], xAdd, y, maxX, maxY, input, minSum, isInit, maxSum));
            } else if ((sum+input[yAdd][x]) < maxSum) {
                return checkMinimumRisk(sum+input[yAdd][x], x, yAdd, maxX, maxY, input, minSum, isInit, maxSum)
            } else if ((sum+input[y][xAdd] < maxSum)) {
                return checkMinimumRisk(sum+input[y][xAdd], xAdd, y, maxX, maxY, input, minSum, isInit, maxSum)
            } else {
                return minSum;

            }
        }
    }

};

const fs = require("fs");
const file = fs.readFileSync("./day15/input.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split("").map((char)=>parseInt(char)));

console.log(calculate(input));
