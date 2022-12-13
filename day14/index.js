/**
 * day 14 - first
 * @param {string} template
 * @param {Array} rules
 * @param {number} n
 * @return {number}
 */
const calculate = (template, rules, n) => {
    console.log("### template/rules", template, rules)
    let result = template;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j*2 < result.length-1; j++) {
            const key = (j*2+1 === result.length) ? result.slice(j*2) : result.slice(j*2, j*2+2);
            const insertion = rules.find((rule)=>rule[0] === key);
            result = [result.slice(0, j*2+1), insertion[1], result.slice(j*2+1)].join("");
        }
    }

    // count each chars
    const countObject = {};
    for (let i = 0; i < result.length; i++) {
        if (!countObject[result[i]]) {
            countObject[result[i]] = 0;
        }
        countObject[result[i]] += 1;
    }
    const countArray = Object.keys(countObject).map((char)=>({char, num: countObject[char]})).sort((a, b)=> a.num - b.num);
    console.log("count", countObject, countArray);

    return countArray[countArray.length-1].num - countArray[0].num;
};

const fs = require("fs");
const file = fs.readFileSync("./day14/input.txt").toString('utf-8');
const input = file.split("\n");

console.log(calculate(input[0], input.slice(2).map((rule)=>rule.split(" -> ")), 10));
