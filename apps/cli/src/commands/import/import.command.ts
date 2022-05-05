import { UserOGM } from '@codelab/backend'
import { createSeedTypesData } from '@codelab/shared/data'
import fs from 'fs'
import * as inquirer from 'inquirer'
import path from 'path'
import yargs, { CommandModule } from 'yargs'
import { createApp } from '../../repository/app.repo'
import { upsertField } from '../../repository/field.repo'
import { ExportedData } from '../export/export.command'
import { createAntDesignAtomsData } from '../parser/ant-design'
import { ParserService } from '../parser/parser.service'
import { importAtom } from './import-atom'
import { importType } from './import-type'

/**
 * Will process json file, and import apps/types accordingly based on their existence
 *
 * Import without any argument seeds data
 */
export const importCommand: CommandModule<any, any> = {
  command: 'import',
  builder: {
    file: {
      describe: 'file',
      type: 'string',
    },
  },
  handler: async ({ file }) => {
    // config({ path: `${process.cwd()}/.env.test` })

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

    // If we specified a file for import
    if (file) {
      const json = fs.readFileSync(path.resolve('data', file), 'utf8')
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

        const importedApp = await createApp(app, selectedUser)

        console.info(`Imported app with id ${importedApp.id}`)
      }
    }

    // Seed all primitive types second, in case they already exist, so our ID's don't get mixed up
    await importType(createSeedTypesData(), selectedUser)

    // Seed all atoms here second
    await importAtom(await createAntDesignAtomsData(), selectedUser)

    // Then seed all atom api's
    const parser = new ParserService(selectedUser)
    const parsedData = await parser.extractFields()

    for (const { atom, fields } of parsedData) {
      await upsertField(atom, fields)
    }

    yargs.exit(0, null!)
  },
}
