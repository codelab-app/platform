import fs from 'fs'
import { sync } from 'glob'
import path from 'path'

export const deleteFilesSync = (directory: string, atoms: Array<string>) => {
  const patternToDelete = `**/atoms/**/!(${atoms.join('|')}).json`

  const files = sync(patternToDelete, {
    cwd: directory,
  })

  files.forEach((file) => {
    const fullPath = path.join(directory, file)

    fs.unlinkSync(fullPath)
    // console.log(`${file} deleted successfully.`)
  })
}
