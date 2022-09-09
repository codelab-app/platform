import { UserOGM } from '@codelab/backend/adapter/neo4j'
import { ImportExportData } from '@codelab/shared/abstract/core'
import * as inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { seedFilePath } from './config'
import { importSeedData } from './import-seed-data'
// import { antdAtomsFactory } from '../../data/atom'
// import { __seedAtomData, __seedTagData } from './import-seed-data'
import { importUserData } from './import-user-data'

/**
 * Imports user data
 *
 * - apps
 *
 * Import without any argument seeds data
 */
export const importCommand: CommandModule<unknown, ImportExportData> = {
  command: 'import',
  describe: 'Import user data',
  // https://stackoverflow.com/questions/63912968/where-can-i-find-documentation-for-builder-in-yargs-npm
  builder: {
    userData: {
      describe: 'userData',
      // demandOption: true,
      type: 'string',
    },
    /**
     * For UI framework component props
     */
    seedData: {
      describe: 'seedData',
      // demandOption: true,
      type: 'string',
      default: seedFilePath,
    },
  },
  /**
   *
   * @param file File for the user data
   */
  handler: async ({ userData, seedData }) => {
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

    /**
     * Seed atoms & types for the project
     */

    await importSeedData(selectedUser, seedFilePath)

    // If we specified a file for import
    // if (userData) {
    //   await importUserData(userData, selectedUser)
    // }

    // Only used by admin
    // await __seedTagData(selectedUser)
    // await __seedAtomData(selectedUser, antdAtomsFactory)

    yargs.exit(0, null!)
  },
}
