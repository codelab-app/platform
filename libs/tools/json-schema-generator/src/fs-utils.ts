import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs'

export const createDir = (path: string): void => {
  if (!existsSync(path)) {
    mkdirSync(path)
  }
}

export const clearFile = (filePath: string): void => {
  try {
    unlinkSync(filePath)
    console.log(`${filePath} was deleted`)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return
    }

    console.log(err)
  }

  writeFileSync(filePath, '')
}
