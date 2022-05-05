import {
  IAppExport,
  IAtomExport,
  ITypeExport,
} from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { config } from 'dotenv'
import * as fs from 'fs'
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

export const saveFile = (data: object | null) => {
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

    // console.log(atomData)
    saveFile(exportData)

    // await exportType()

    yargs.exit(0, null!)
  },
}
