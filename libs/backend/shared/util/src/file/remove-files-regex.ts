import fs from 'fs'
import * as glob from 'glob'
import path from 'path'

export const deleteFilesSync = (directory: string, pattern: string) => {
  const files = glob.sync(pattern, { cwd: directory })

  files.forEach((file) => {
    const fullPath = path.join(directory, file)

    fs.unlinkSync(fullPath)
    // console.log(`${file} deleted successfully.`)
  })
}
