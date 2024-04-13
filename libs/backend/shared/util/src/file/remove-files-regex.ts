import fs from 'fs'
import { sync } from 'glob'
import path from 'path'

export const deleteFilesSync = (directory: string, pattern: string) => {
  const files = sync(pattern, { cwd: directory })

  files.forEach((file) => {
    const fullPath = path.join(directory, file)

    fs.unlinkSync(fullPath)
    // console.log(`${file} deleted successfully.`)
  })
}
