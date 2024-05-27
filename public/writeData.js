const fs = require("fs");
const dataJson = fs.readFileSync("./public/data.json");
const parseDataJson = JSON.parse(dataJson);
const array = [];
for (let key in parseDataJson) {
  array.push(parseDataJson[key]);
}
console.log(array[0]);