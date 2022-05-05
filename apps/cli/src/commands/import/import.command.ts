import { UserOGM } from '@codelab/backend'
import {
  createAntDesignAtomsData,
  createPrimitiveTypesData,
} from '@codelab/shared/data'
import fs from 'fs'
import * as inquirer from 'inquirer'
import path from 'path'
import yargs, { CommandModule } from 'yargs'
import { createApp } from '../../repository/app.repo'
import { defaultOutputPath, ExportedData } from '../export/export.command'
import { SeederService } from '../seed/seeder.service'
import { importAtom } from './import-atom'
import { importType } from './import-type'

/**
 * Will process json file, and import apps/types accordingly based on their existence
 */
export const importCommand: CommandModule<any, any> = {
  command: 'import <file>',
  // builder: {
  //   file: {
  //     describe: 'file',
  //     type: 'string',
  //   },
  // },
  handler: async ({ file = defaultOutputPath }) => {
    // config({ path: `${process.cwd()}/.env.test` })

    const json = fs.readFileSync(path.resolve('data', file), 'utf8')
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

    // Seed all primitive types second, in case they already exist, so our ID's don't get mixed up
    await importType(createPrimitiveTypesData(), selectedUser)

    if (atoms.length) {
      console.log('Importing atoms...')
      await importAtom(atoms, selectedUser)
    }

    // Seed all atoms here second
    await importAtom(await createAntDesignAtomsData(), selectedUser)

    // Then seed all atom api's
    const seeder = new SeederService()
    const seedData = await seeder.seed()
    console.log('seed data', seedData)

    if (app) {
      console.log('Importing app...')

      const importedApp = await createApp(app, selectedUser)

      console.info(`Imported app with id ${importedApp.id}`)
    }

    yargs.exit(0, null!)
  },
}
