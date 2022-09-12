import { UserOGM } from '@codelab/backend/adapter/neo4j'
import * as inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { seedFilePath } from './config'
import { importSeedData } from './import-seed-data'
// import { antdAtomsFactory } from '../../data/atom'
// import { __seedAtomData, __seedTagData } from './import-seed-data'
import { importUserData } from './import-user-data'

/**
 * Imports seed data and/or user data.
 *
 * User data includes apps, user type, resources
 */
export const importCommand: CommandModule<any, unknown> = {
  command: 'import',
  describe: 'Import user data',
  // https://stackoverflow.com/questions/63912968/where-can-i-find-documentation-for-builder-in-yargs-npm
  /**
   *
   * @param file File for the user data
   */
  handler: async () => {
    const User = await UserOGM({ reinitialize: true })
    const users = await User.find()

    const { selectedUser, confirmImportSeedData, confirmImportUserData } =
      await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedUser',
          message: 'Select which user to be owner of the app',
          choices: users.map((user) => ({
            name: user.email,
            value: user.id,
          })),
        },
        {
          type: 'confirm',
          name: 'confirmImportSeedData',
          message: 'Do you want to import seed data',
        },
        {
          type: 'confirm',
          name: 'confirmImportUserData',
          message: 'Do you want to import user data',
        },
      ])

    /**
     * Seed atoms & types for the project
     */
    if (confirmImportSeedData) {
      await importSeedData(selectedUser, seedFilePath)
    }

    // If we specified a file for import
    if (confirmImportUserData) {
      const { userDataFilePath } = await inquirer.prompt([
        {
          type: 'input',
          name: 'userDataFilePath',
          message: 'What is the file path to the user data',
        },
      ])

      await importUserData(userDataFilePath, selectedUser)
    }

    // Only used by admin
    // await __seedTagData(selectedUser)
    // await __seedAtomData(selectedUser, antdAtomsFactory)

    yargs.exit(0, null!)
  },
}
