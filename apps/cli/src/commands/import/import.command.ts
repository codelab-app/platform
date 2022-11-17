import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import {
  assignUserOption,
  ExportProps,
  seedDataPathOption,
  skipSeedDataOption,
  skipUserDataOption,
  upsertUserMiddleware,
  userDataPathOption,
} from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Stage } from '../../shared/utils/stage'
import { importSeedData } from './import-seed-data'
import { importUserData } from './import-user-data'

type ImportProps = ExportProps & {
  email?: string
}

/**
 * Imports seed data and/or user data.
 *
 * User data includes apps, user type, resources
 */
export const importCommand: CommandModule<ImportProps, ImportProps> = {
  command: 'import',
  describe: 'Import user data',
  builder: (argv) =>
    argv
      .options({
        ...assignUserOption,
        ...skipUserDataOption,
        ...skipSeedDataOption,
        ...userDataPathOption,
        ...seedDataPathOption,
        ...getStageOptions([Stage.Dev, Stage.Test]),
      })
      .middleware([loadStageMiddleware, upsertUserMiddleware]),
  // https://stackoverflow.com/questions/63912968/where-can-i-find-documentation-for-builder-in-yargs-npm
  /**
   *
   * @param file File for the user data
   */
  handler: async ({
    email,
    seedDataPath,
    userDataPath,
    skipSeedData,
    skipUserData,
  }) => {
    const User = await Repository.instance.User

    const selectedUserId = email
      ? (await User.find({ where: { email } }))[0]?.id
      : (await inquirer.prompt([await selectUserPrompt()])).selectedUserId

    const shouldSkipSeedData: boolean =
      skipSeedData !== undefined
        ? skipSeedData
        : !(
            await inquirer.prompt([
              {
                type: 'confirm',
                name: 'confirm',
                default: false,
                message: 'Would you like to import seed data?',
              },
            ])
          ).confirm

    const shouldSkipUserData: boolean =
      skipUserData !== undefined
        ? skipUserData
        : !(
            await inquirer.prompt([
              {
                type: 'confirm',
                name: 'confirm',
                default: false,
                message: 'Would you like to import user data?',
              },
            ])
          ).confirm

    /**
     * Seed atoms & types for the project
     */
    if (!shouldSkipSeedData) {
      const inputFilePath =
        seedDataPath !== undefined
          ? seedDataPath
          : (
              await inquirer.prompt([
                {
                  type: 'input',
                  name: 'inputFilePath',
                  message: 'Enter a path to import from, relative to ./',
                  default: './data/seed-data.json',
                },
              ])
            ).inputFilePath

      await importSeedData(selectedUserId, inputFilePath)
    }

    // If we specified a file for import
    if (!shouldSkipUserData) {
      const inputFilePath =
        seedDataPath !== undefined
          ? seedDataPath
          : (
              await inquirer.prompt([
                {
                  type: 'input',
                  name: 'inputFilePath',
                  message: 'Enter a path to import from, relative to ./',
                },
              ])
            ).inputFilePath

      await importUserData(inputFilePath, selectedUserId)
    }

    yargs.exit(0, null!)
  },
}
