const path = require("path")
const fsPromises = require("fs/promises")
const fs = require("fs")

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
  const myBaseDir = path.dirname(__filename)
  const inputPath = path.join(myBaseDir, copyPath)
  const outputPath = path.join(myBaseDir, pastePath)

  const entries = await fsPromises.readdir(inputPath, { withFileTypes: true })

  PromiseList = entries.map(entry => {
    return CopySingleItem(inputPath, outputPath, entry.name)
  })
  await Promise.all(PromiseList)
}

fastCopy("static-copy", "static-paste")
