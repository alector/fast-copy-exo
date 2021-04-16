const path = require("path")
const fsPromises = require("fs/promises")
const fs = require("fs")

const CopySingleItem = async (inputPath, outputPath, fileName) => {
  try {
    // inputPath: the absolute path of COPY folder
    // example inputPath: Users/panos/PPCode/alyra/alyra-02-git-node/fast-copy-exo/static-copy'

    // fileName: 'file1.txt'
    const inputPathFile = path.join(inputPath, fileName)
    // inputPathFile: Users/panos/PPCode/alyra/alyra-02-git-node/fast-copy-exo/static-copy'

    const outputPathFile = path.join(outputPath, fileName)
    await fsPromises.copyFile(inputPathFile, outputPathFile)
  } catch (e) {
    // throw e.message
    console.error(e)
  }
}

const fastCopy = async (copyPath, pastePath) => {
  const myBaseDir = path.dirname(__filename)
  const inputPath = path.join(myBaseDir, copyPath)
  const outputPath = path.join(myBaseDir, pastePath)

  const entries = await fsPromises.readdir(inputPath, { withFileTypes: true })

  // try {
  //   await CopySingleItem(inputPath, outputPath, entries[1].name)
  // } catch (e) {
  //   console.log(e.message)
  // }

  // NOTIONS
  // functions in JS are FIRST CLASS CITIZENS
  // list de COLD FUNTIONS

  PromiseList = entries.map(entry => {
    return CopySingleItem(inputPath, outputPath, entry.name)
  })
  await Promise.all(PromiseList)
}

fastCopy("static-copy", "static-paste")
