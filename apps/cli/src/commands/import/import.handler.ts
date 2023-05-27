import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { ImportAdminDataService } from '@codelab/backend/application/admin'
import { importUserData } from '@codelab/backend/application/user'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'
import type { ArgumentsCamelCase } from 'yargs'
import type { ExportProps } from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/select-user'

export type ImportProps = ExportProps & {
  email?: string
}

export const importHandler = async ({
  email,
  seedDataPath,
  skipSeedData,
  skipUserData,
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
    await new ImportAdminDataService().execute({ auth0Id: selectedAuth0Id })
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
    await importUserData(userData, { auth0Id: selectedAuth0Id })
  }
}
