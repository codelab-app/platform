import { ExportAdminDataCommand } from '@codelab/backend/application/admin'
import { exportUserData } from '@codelab/backend/application/user'
import { loadStageMiddleware } from '@codelab/backend/infra/adapter/cli'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import inquirer from 'inquirer'
import type { Argv, CommandModule } from 'yargs'
import yargs from 'yargs'
import { globalHandler } from '../../../infra/adapter/cli/src/shared/handler'
import { getStageOptions } from '../../../infra/adapter/cli/src/shared/options'
import type { ExportProps } from '../../../infra/adapter/cli/src/shared/path-args'
import {
  adminDataPathOption,
  skipAdminDataOption,
  skipUserDataOption,
  userDataPathOption,
} from '../../../infra/adapter/cli/src/shared/path-args'
import { selectUserPrompt } from '../../../infra/adapter/cli/src/shared/prompts/select-user'
import { Stage } from '../../../infra/adapter/cli/src/shared/utils/stage'

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 */
@Injectable()
export class ExportService implements CommandModule<ExportProps, ExportProps> {
  command = 'export'

  describe = 'Export user data'

  constructor(private readonly commandBus: CommandBus) {}

  builder(argv: Argv<ExportProps>) {
    return argv
      .options({
        ...skipUserDataOption,
        ...skipAdminDataOption,
        ...userDataPathOption,
        ...adminDataPathOption,
        ...getStageOptions([Stage.Dev, Stage.Test]),
      })
      .middleware([loadStageMiddleware])
  }

  handler = globalHandler<ExportProps>(
    async ({ adminDataPath, skipAdminData, skipUserData, userDataPath }) => {
      const App = await Repository.instance.App
      const apps = await App.find()

      const shouldSkipAdminData: boolean =
        skipAdminData !== undefined
          ? skipAdminData
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

      if (!shouldSkipAdminData) {
        await this.commandBus.execute(new ExportAdminDataCommand())
        // ;(
        //   await new ExportAdminDataService(adminDataPath).execute()
        // ).saveAsFiles()
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
  )
}
