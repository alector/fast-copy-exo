const path = require("path")
const fs = require("fs")

// Source @visualjerk https://gist.github.com/drodsou/de2ba6291aea67ffc5bc4b52d8c32abd

function writeFileSyncRecursive(filename, content, charset) {
  const folders = filename.split(path.sep).slice(0, -1)
  if (folders.length) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
      return folderPath
    })
  }
  fs.writeFileSync(filename, content, charset)
}

module.exports = writeFileSyncRecursive
