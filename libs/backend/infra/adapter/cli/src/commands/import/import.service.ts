import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { ImportAdminDataService } from '@codelab/backend/application/admin'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { Injectable } from '@nestjs/common'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'
import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'
import { globalHandler } from '../../shared/handler'
import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'
import type { ExportProps } from '../../shared/path-args'
import {
  assignUserOption,
  seedDataPathOption,
  skipSeedDataOption,
  skipUserDataOption,
  upsertUserMiddleware,
  userDataPathOption,
} from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/select-user'
import { Stage } from '../../shared/utils/stage'

export type ImportProps = ExportProps & {
  email?: string
}

@Injectable()
export class ImportService implements CommandModule<unknown, ImportProps> {
  constructor(
    private readonly importAdminDataService: ImportAdminDataService,
  ) {}

  command = 'import'

  describe = 'Import user data'

  builder(argv: Argv<ImportProps>) {
    return argv
      .options({
        ...assignUserOption,
        ...skipUserDataOption,
        ...skipSeedDataOption,
        ...userDataPathOption,
        ...seedDataPathOption,
        ...getStageOptions([Stage.Dev, Stage.Test]),
      })
      .middleware([
        loadStageMiddleware,
        upsertUserMiddleware,
        // Issue with inferring option
      ]) as Argv<ImportProps>
  }

  handler = globalHandler(
    async ({
      email,
      seedDataPath,
      skipSeedData,
      skipUserData,
      stage,
    }: ArgumentsCamelCase<ImportProps>) => {
      const User = await Repository.instance.User

      const selectedAuth0Id = email
        ? (await User.find({ where: { email } }))[0]?.auth0Id
        : (await inquirer.prompt([await selectUserPrompt()])).selectedAuth0Id

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
        await this.importAdminDataService.execute({ auth0Id: selectedAuth0Id })
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

        const userData = JSON.parse(json) as IUserDataExport
        console.log('import user data')
        // await importUserData(userData, { auth0Id: selectedAuth0Id })
      }
    },
  )
}
