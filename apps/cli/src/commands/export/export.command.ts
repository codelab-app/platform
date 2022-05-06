import {
  IAppExport,
  IAtomExport,
  ITypeExport,
} from '@codelab/shared/abstract/core'
import { config } from 'dotenv'
import * as fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'
import yargs, { CommandModule } from 'yargs'
import { exportApp } from './export-app'
import { exportAtom } from './export-atom'
import { exportType } from './export-type'

config({ path: `${process.cwd()}/.env` })

export const defaultOutputPath = path.resolve('data', 'export-data.json')

export type ExportedData = {
  app: IAppExport | null
  atoms: Array<IAtomExport>
  types: Array<ITypeExport>
}

export const saveFile = async (data: object | null) => {
  /**
   * Export info, file path etc
   */
  const { outputPath } = await inquirer.prompt([
    {
      type: 'input',
      name: 'outputPath',
      message: 'Enter a path to export to, relative to ./data',
      default: `export-data-${Date.now()}.json`,
    },
  ])

  if (!outputPath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = JSON.stringify(data, null, 2)
  fs.writeFileSync(defaultOutputPath, json)
}

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
export const exportCommand: CommandModule<any, any> = {
  command: 'export',

  handler: async () => {
    const appData = await exportApp()
    const atomData = await exportAtom()
    const typeData = await exportType()

    const exportData: ExportedData = {
      ...appData,
      ...atomData,
      ...typeData,
    }

    await saveFile(exportData)

    yargs.exit(0, null!)
  },
}
