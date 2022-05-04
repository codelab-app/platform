import {
  AppOGM,
  AtomOGM,
  IAppModel,
  IAtomModel,
  IComponentModel,
  IElementModel,
  IPageModel,
  UserOGM,
} from '@codelab/backend'
import { IPageExport } from '@codelab/shared/abstract/core'
import { config } from 'dotenv'
import fs from 'fs'
import * as inquirer from 'inquirer'
import { flatMap } from 'lodash'
import path from 'path'
import { v4 } from 'uuid'
import yargs, { CommandModule } from 'yargs'
import { defaultOutputPath, ExportedData } from '../export/export.command'
import { importApp } from './import-app'
import { importAtom } from './import-atom'
import { importComponent } from './import-component'
import { importElementInitial, updateImportedElement } from './import-element'
import { importType } from './import-type'

/**
 * Will process json file, and import apps/types accordingly based on their existence
 */
export const importCommand: CommandModule<any, any> = {
  command: 'import',
  builder: {
    filePath: {
      describe: 'filePath',
      type: 'string',
    },
  },
  handler: async ({ filePath = defaultOutputPath }) => {
    // config({ path: `${process.cwd()}/.env` })

    const json = fs.readFileSync(path.resolve('data', filePath), 'utf8')
    const Users = await UserOGM()
    const allUsers = await Users.find()

    const { selectedUser } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedUser',
        message: 'Select which user to be owner of the app',
        choices: allUsers.map((user) => ({
          name: user.email,
          value: user.id,
        })),
      },
    ])

    const { app, atoms, types } = JSON.parse(json) as ExportedData

    if (types.length) {
      console.log('Importing types...\n')
      await importType(types, selectedUser)
    }

    if (atoms.length) {
      console.log('Importing atoms...')
      await importAtom(atoms, selectedUser)
    }

    if (app) {
      console.log('Importing app...')

      const importedApp = await importApp(app, selectedUser)

      console.info(`Imported app with id ${importedApp.id}`)
    }

    yargs.exit(0, null!)
  },
}
