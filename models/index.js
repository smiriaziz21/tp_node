const fs = require('fs')

const files = fs.readdirSync('./models')
let objectToExport = {};
for (const file of files) {
  if (file !== "index.js")
    objectToExport[capitalizeFirstLetter(file.substr(0, file.indexOf("Model")))] =
    require("./" + file)[capitalizeFirstLetter(file.substr(0, file.indexOf("Model")))]
}
module.exports = objectToExport


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
