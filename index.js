const path = require("path")
const fsPromises = require("fs/promises")
const fs = require("fs")

// global.__basedir = __dirname

const CopySingleItem = async (inputPath, outputPath, fileName) => {
  try {
    const inputPathFile = path.join(inputPath, fileName)
    const outputPathFile = path.join(outputPath, fileName)
    await fsPromises.copyFile(inputPathFile, outputPathFile)
  } catch (e) {
    console.error(e)
  }
}

const fastCopy = async (copyPath, pastePath) => {
  // /Users/panos/PPCode/alyra/alyra-02-git-node/fast-copy-exo\statit-copy
  const myBaseDir = path.dirname(__filename)
  const inputPath = path.join(myBaseDir, copyPath)
  const outputPath = path.join(myBaseDir, pastePath)

  // console.log(inputPath)
  const entries = await fsPromises.readdir(inputPath, { withFileTypes: true })

  file1 = entries[1].name
  console.log(file1)
  console.log({ inputPath })
  console.log({ file1 })

  const PromisesList = []
  try {
    for (entry of entries) {
      let promise = CopySingleItem(inputPath, outputPath, entry.name)
      PromisesList.push(promise)
    }
  } catch (e) {
    console.error(e.message)
  }

  await Promise.all(PromisesList)
  // return CopySingleItem(inputPath, outputPath)

  console.log(PromisesList)
}

fastCopy("static-copy", "static-paste")
