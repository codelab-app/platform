import fs from 'fs'
import inquirer from 'inquirer'
import * as path from 'path'

export const saveExportFile = async (data: object | null) => {
  /**
   * Export info, file path etc
   */
  const { outputPath } = await inquirer.prompt([
    {
      type: 'input',
      name: 'outputPath',
      message: 'Enter a path to export to, relative to ./data',
      default: `user-data-${Date.now()}.json`,
    },
  ])

  if (!outputPath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = JSON.stringify(data, null, 2)
  const exportPath = path.resolve('data', outputPath)
  fs.writeFileSync(exportPath, json)
}
