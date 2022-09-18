import fs from 'fs'
import * as path from 'path'

export const saveExportFile = async (data: object, outputFilePath: string) => {
  if (!outputFilePath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = JSON.stringify(data, null, 2)
  const exportPath = path.resolve('data', outputFilePath)

  fs.writeFileSync(exportPath, json)
}
