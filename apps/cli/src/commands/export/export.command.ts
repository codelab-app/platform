import { ExportAdminDataService } from '@codelab/backend/application/admin'
import { exportUserData } from '@codelab/backend/application/user'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import inquirer from 'inquirer'
import type { CommandModule } from 'yargs'
import yargs from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import type { ExportProps } from '../../shared/path-args'
import {
  seedDataPathOption,
  skipSeedDataOption,
  skipUserDataOption,
  userDataPathOption,
} from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Stage } from '../../shared/utils/stage'

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
export const exportCommand: CommandModule<ExportProps, ExportProps> = {
  builder: (argv) =>
    argv
      .options({
        ...skipUserDataOption,
        ...skipSeedDataOption,
        ...userDataPathOption,
        ...seedDataPathOption,
        ...getStageOptions([Stage.Dev, Stage.Test]),
      })
      .middleware([loadStageMiddleware]),
  command: 'export',
  describe: 'Export user data',
  handler: async ({
    seedDataPath,
    skipSeedData,
    skipUserData,
    userDataPath,
  }) => {
    const App = await Repository.instance.App
    const apps = await App.find()

    const shouldSkipSeedData: boolean =
      skipSeedData !== undefined
        ? skipSeedData
        : !(
            await inquirer.prompt([
              {
                default: false,
                message: 'Would you like to export seed data?',
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
                message: 'Would you like to export user data?',
                name: 'confirm',
                type: 'confirm',
              },
            ])
          ).confirm

    // Exit early if no apps to export
    if (!shouldSkipUserData && !apps.length) {
      console.log('No app exists')
      yargs.exit(0, null!)
    }

    if (!shouldSkipSeedData) {
      ;(await new ExportAdminDataService().execute()).saveAsFiles()
    }

    if (!shouldSkipUserData) {
      const { selectedAppId, selectedAuth0Id } = await inquirer.prompt([
        await selectUserPrompt(),
        {
          choices: apps.map((app) => ({
            name: app.name,
            value: app.id,
          })),
          message: 'Select which app to export',
          name: 'selectedApp',
          type: 'list',
        },
      ])

      const exportedUserData = await exportUserData({
        id: selectedAppId,
      })

      await saveFormattedFile(
        `${selectedAuth0Id}-${Date.now()}.json`,
        exportedUserData,
      )
    }

    yargs.exit(0, null!)
  },
}
