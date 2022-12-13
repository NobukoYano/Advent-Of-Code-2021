/**
 * day 12 - first
 * @param {Array<Array<string>>} input
 * @return {number}
 */
const calculate = (input) => {
    // prepare all paths
    const allPaths = [];
    for (const row of input) {
        if (row[1] !== "start" && row[0] !== "end") {
            allPaths.push([...row]);
        }
        if (row[0] !== "start" && row[1] !== "end") {
            allPaths.push(row.reverse());
        }
    }
    console.log("### allPaths 1", allPaths);
    const startPaths = allPaths.filter((path)=>path[0] === "start");

    const routes = [];
    for (const currentPath of startPaths) {
        routes.push(...createRoutes(allPaths, currentPath));
    }
    console.log("### routes", routes);
    return routes.length;
};
/**
 *
 * @param allPaths
 * @param route
 * @return {Array<Array<string>>}
 */
const createRoutes = (allPaths, route) => {
    const endedRoutes = []
    for (const nextPath of allPaths) {
        if ((nextPath[0] === route[route.length-1]) && (isUpper(nextPath[1]) || !route.includes(nextPath[1]))) {
            const newRoute = [...route];
            newRoute.push(nextPath[1])
            if (nextPath[1] === "end") {
                endedRoutes.push(newRoute);
            } else {
                endedRoutes.push(...createRoutes(allPaths, newRoute));
            }
        }
    }
    return endedRoutes;
};

const isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

const fs = require("fs");
const file = fs.readFileSync("./day12/input.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split("-"));

console.log(calculate(input));
