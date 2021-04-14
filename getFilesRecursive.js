const path = require("path")
const fs = require("fs")

// Path.join(  "myfile", "myfolder", "myfile.txt")
// mufolder\myfolder\mufile.txt

const getFilesRecursive = cur_path => {
  // find all ENTRIES = FILES + FOLDERS in current path
  const entries = fs.readdirSync(cur_path, { withFileTypes: true })

  // isolate the FILES from the ENTRIES in current path
  const files = entries
    .filter(file => {
      return !file.isDirectory()
    })
    .map(file => {
      filename = file.name
      extension = filename.split(".").pop()
      filepath = path.join(cur_path, file.name)
      return { ...file, path: filepath, filename, ext: extension }
    })

  // isolate the FOLDERS from the ENTRIES in current path
  const folders = entries.filter(folder => folder.isDirectory())

  for (const folder of folders) {
    // { folder: Dirent { name: 'test-folder', [Symbol(type)]: 2 } }

    dirPath = path.join(cur_path, folder.name)
    files.push(...getFilesRecursive(dirPath))
  }

  return files
}

module.exports = getFilesRecursive

if (require.main === module) {
  inputPath = "/Users/panos/PPCode/alyra/alyra-02-git-node"

  const bbb = getFilesRecursive(inputPath)
  console.log(bbb)
  // test blabla
}
