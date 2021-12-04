/**
 * day 4 - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (inputs) => {
    const numbers = inputs[0];
    const boards = [];

    let board = [];

    // Format boards
    for (let i = 1; i < inputs.length; i++) {
        if (inputs[i]) {
            // build board
            const row = [];
            for (let j = 0; j < 5; j++ ) {
                row.push(parseInt(inputs[i].slice(3 * j, 3 * (j+1) - 1)));
            }
            board.push(row);
        } else {
            // push board into boards
            if (board.length) {
                boards.push(board);
                board = [];
            }
        }
    }

    return playBingo(numbers, boards, 0);
};

/**
 *
 * @param {Array<number>} numbers
 * @param {Array<Array<Array<number>>>} boards - three dimensional array
 * @param index - position of numbers
 * @return {number} sum of the uncalled numbers of a winner board, -1 if no winner board has won, -2 if more than one board have won
 */
const playBingo = (numbers, boards, index) => {
    const numbersArray = numbers.split(",").map((num)=>parseInt(num));

    // error if index is bigger then the length of numbers
    if (index > numbers.length - 1) return -1;

    const calledNumbers = index === numbersArray.length ? numbersArray : numbersArray.slice(0, index + 1);

    const winnerBoards = [];
    for (const board of boards) {
        let hasWon = false;
        for (let i = 0; i < 5; i++) {
            // check row
            const rowOpened = board[i].filter((num)=>calledNumbers.includes(num));
            if (rowOpened.length === 5) {
                hasWon = true;
                console.log("won - row!!!", board, index, numbersArray[index]);
                winnerBoards.push(board);
                break;
            }

            // check column
            const columnOpened = [];
            board.forEach((num)=>{
                if (calledNumbers.includes(num[i])) {
                    columnOpened.push(num[i]);
                }
            })
            if (columnOpened.length === 5) {
                hasWon = true;
                console.log("won - column!!!", board, index, numbersArray[index]);
                winnerBoards.push(board);
                break;
            }
        }
    }
    if (winnerBoards.length > 1) return -2;
    if (winnerBoards.length === 1) {
        let sum = 0;
        winnerBoards[0].forEach((row)=>{
           row.forEach((num)=>{
               if (!calledNumbers.includes(num)) {
                   sum = sum + num;
               }
           })
        });
        return sum * numbersArray[index];
    }

    return playBingo(numbers, boards, index + 1);
}

const fs = require("fs");
const file = fs.readFileSync("./day4/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(calculate(input));
