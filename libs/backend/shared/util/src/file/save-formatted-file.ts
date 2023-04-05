import fs from 'fs'
import { EOL } from 'os'
import * as path from 'path'

export const saveFormattedFile = (outputFilePath: string, data: object) => {
  if (!outputFilePath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = JSON.stringify(data, null, 2)
  const exportPath = path.resolve('./', outputFilePath)

  fs.mkdirSync(path.dirname(exportPath), { recursive: true })
  fs.writeFileSync(exportPath, json)
  fs.appendFileSync(exportPath, EOL, 'utf8')
}
