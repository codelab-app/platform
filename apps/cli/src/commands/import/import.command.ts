import { UserOGM } from '@codelab/backend'
import * as inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { importSeedData } from './import-seed-data'
import { importUserData } from './import-user-data'

/**
 * Will process json file, and import apps/types accordingly based on their existence
 *
 * Import without any argument seeds data
 */
export const importCommand: CommandModule<any, any> = {
  command: 'import',
  // https://stackoverflow.com/questions/63912968/where-can-i-find-documentation-for-builder-in-yargs-npm
  builder: {
    file: {
      describe: 'file',
      // demandOption: true,
      type: 'string',
    },
  },
  handler: async ({ file }) => {
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
    await importSeedData(selectedUser)

    // If we specified a file for import
    if (file) {
      await importUserData(file, selectedUser)
    }

    // Only used by admin
    // await __seedData(selectedUser)

    yargs.exit(0, null!)
  },
}
