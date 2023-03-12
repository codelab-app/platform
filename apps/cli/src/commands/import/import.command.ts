import type { ExportedUserData } from '@codelab/backend/abstract/core'
import { importUserData } from '@codelab/backend/application/user'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'
import type { CommandModule } from 'yargs'
import yargs from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import type { ExportProps } from '../../shared/path-args'
import {
  assignUserOption,
  seedDataPathOption,
  skipSeedDataOption,
  skipUserDataOption,
  upsertUserMiddleware,
  userDataPathOption,
} from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Stage } from '../../shared/utils/stage'
import { importSeedData } from './import-seed-data'

type ImportProps = ExportProps & {
  email?: string
}

/**
 * Imports seed data and/or user data.
 *
 * User data includes apps, user type, resources
 */
export const importCommand: CommandModule<ImportProps, ImportProps> = {
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
  command: 'import',
  describe: 'Import user data',
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
                default: false,
                message: 'Would you like to import seed data?',
                name: 'confirm',
                type: 'confirm',
              },
            ])
          ).confirm

    const shouldSkipUserData: boolean =
      skipUserData !== undefined
        ? skipUserData
        : !(
            await inquirer.prompt([
              {
                default: false,
                message: 'Would you like to import user data?',
                name: 'confirm',
                type: 'confirm',
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
                  default: './data/seed-data.json',
                  message: 'Enter a path to import from, relative to ./',
                  name: 'inputFilePath',
                  type: 'input',
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
                  message: 'Enter a path to import from, relative to ./',
                  name: 'inputFilePath',
                  type: 'input',
                },
              ])
            ).inputFilePath

      const json = fs.readFileSync(
        path.resolve(process.cwd(), inputFilePath),
        'utf8',
      )

      const userData = JSON.parse(json) as ExportedUserData
      await importUserData(userData, selectedUserId)
    }

    yargs.exit(0, null!)
  },
}
