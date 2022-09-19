import inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { defaultSeedFilePath } from './config'
import { importSeedData } from './import-seed-data'
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
    const { selectedUserId, confirmImportSeedData, confirmImportUserData } =
      await inquirer.prompt([
        await selectUserPrompt(),
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
      await importSeedData(selectedUserId, defaultSeedFilePath)
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

      await importUserData(userDataFilePath, selectedUserId)
    }

    yargs.exit(0, null!)
  },
}
