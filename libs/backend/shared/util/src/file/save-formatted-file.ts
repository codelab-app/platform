import fs from 'fs'
import * as path from 'path'

export const saveFormattedFile = (outputFilePath: string, data: object) => {
  if (!outputFilePath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = JSON.stringify(data, null, 2)
  const exportPath = path.resolve('./', outputFilePath)

  fs.writeFileSync(exportPath, json)
}
