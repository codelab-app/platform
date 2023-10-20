import fs from 'fs'
import path from 'path'

const readDirectory = (dirPath: string): Array<string> => {
  let results: Array<string> = []
  const list = fs.readdirSync(dirPath)

  list.forEach((file) => {
    file = path.join(dirPath, file)

    const stat = fs.statSync(file)

    if (stat.isDirectory()) {
      results = results.concat(readDirectory(file))
    } else {
      results.push(file)
    }
  })

  return results
}

export const concatenateFileContents = (dirPath: string): string => {
  const filePaths = readDirectory(dirPath)
  let content = ''
  filePaths.forEach((filePath) => {
    content += fs.readFileSync(filePath, 'utf8')
  })

  return content
}
