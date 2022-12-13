/**
 * day 14 - second
 * @param {string} template
 * @param {Array} rules
 * @param {number} n
 * @return {number}
 */
const calculate = (template, rules, n) => {
    const start = Date.now();
    console.log("### template/rules", template, rules)
    const temp = []
    for (let j = 0; j < template.length-1; j++) {
        const chars = j === template.length - 2 ? template.slice(j) : template.slice(j, j+2)
        temp.push(insertNTimes(chars, n, rules));
    }
    const result = temp.join("") + template[template.length - 1];

    // count each chars
    const countObject = {};
    for (let i = 0; i < result.length; i++) {
        if (!countObject[result[i]]) {
            countObject[result[i]] = 0;
        }
        countObject[result[i]] += 1;
    }
    const countArray = Object.keys(countObject).map((char)=>({char, num: countObject[char]})).sort((a, b)=> a.num - b.num);
    console.log("count", countArray);
    const end = Date.now();
    console.log("### performance in sec:", (end-start)/1000);
    return countArray[countArray.length-1].num - countArray[0].num;
};

/**
 *
 * @param {string} chars - consist of two characters
 * @param {number} n
 * @param {Array}
 * @return {string}
 */
const insertNTimes = (chars, n, rules) => {
    if (n === 0) return chars[0];
    const rule = rules.find((r)=>r[0] === chars);
    return insertNTimes(chars[0]+rule[1], n - 1, rules) + insertNTimes(rule[1]+chars[1], n - 1, rules);

}

const fs = require("fs");
const file = fs.readFileSync("./day14/input.txt").toString('utf-8');
const input = file.split("\n");

console.log(calculate(input[0], input.slice(2).map((rule)=>rule.split(" -> ")), 25));
