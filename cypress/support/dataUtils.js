const fs = require('fs')
const path = require('path')
const csvParse = require('csv-parse')

/**
 * Reads a CSV file and returns the parsed data.
 * @param {string} filePath - Path to the CSV file.
 * @param {function} callback - Callback function to handle the parsed data.
 */
function readCSV(filePath, callback) {
  const fullPath = path.resolve(__dirname, `../fixtures/${filePath}`)
  fs.readFile(fullPath, (err, data) => {
    if (err) throw err
    csvParse(data, { columns: false, trim: true }, (err, parsedData) => {
      if (err) throw err
      callback(parsedData.flat())
    })
  })
}

module.exports = { readCSV }
