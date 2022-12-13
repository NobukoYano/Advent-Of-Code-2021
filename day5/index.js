/**
 * day X - second
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (inputs) => {
    const {formatted, maxX, maxY} = convertToArray(inputs);
    const matrix = new Array(maxX + 1).fill(0).map(() => new Array(maxY + 1).fill(0));

    for (const move of formatted) {
        // vertical move
        if (move[0][0] === move[1][0]) {
            if (move[0][1] < move[1][1]) {
                for (let i = move[0][1]; i < move[1][1] + 1; i++) {
                    matrix[i][move[0][0]] += 1;

                }
            }
            if (move[0][1] === move[1][1]) {
                matrix[move[0][1]][move[0][0]] += 1;
            }
            if (move[0][1] > move[1][1]) {
                for (let i = move[1][1]; i < move[0][1] + 1; i++) {
                    matrix[i][move[0][0]] += 1;
                }
            }
        }

        // horizontal move
        if (move[0][1] === move[1][1]) {
            if (move[0][0] < move[1][0]) {
                for (let i = move[0][0]; i < move[1][0] + 1; i++) {
                    matrix[move[0][1]][i] += 1;
                }
            }
            if (move[0][0] === move[1][0]) {
                matrix[move[0][0]][move[0][1]] += 1;
            }
            if (move[0][0] > move[1][0]) {
                for (let i = move[1][0]; i < move[0][0] + 1; i++) {
                    matrix[move[0][1]][i] += 1;
                }
            }
        }
    }
    let count = 0;
    for (const row of matrix) {
        for (const cell of row) {
            if (cell >= 2) {
                count += 1;
            }
        }
    }
    return count;
};
/**
 * format input data
 * @param {Array<string>} inputs
 * @return {Array<Array<Array<number>>>} [[[x1, y1], [x2, y2]], [[a1, b1], [a2, b2]...]]
 */
const convertToArray = (inputs) => {
    const formatted = [];
    let maxX = 0;
    let maxY = 0;

    for (const input of inputs) {
        const [from, to] = input.split(" -> ");
        const [fromX, fromY] = from.split(",");
        const [toX, toY] = to.split(",");

        const move = [[parseInt(fromX), parseInt(fromY)], [parseInt(toX), parseInt(toY)]];
        if (move[0][0] === move[1][0] || move[0][1] === move[1][1]) {
            formatted.push(move);
            maxX = Math.max(fromX, toX, maxX);
            maxY = Math.max(fromY, toY, maxY);
        }
    }
    return {formatted, maxX, maxY};
}

const fs = require("fs");
const file = fs.readFileSync("./day5/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(calculate(input));
