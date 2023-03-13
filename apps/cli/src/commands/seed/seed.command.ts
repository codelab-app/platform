import { SeedDataService } from '@codelab/backend/application/admin'
import { UserRepository } from '@codelab/backend/domain/user'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import inquirer from 'inquirer'
import type { CommandModule } from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import { assignUserOption, upsertUserMiddleware } from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Stage } from '../../shared/utils/stage'

interface ParseProps {
  email?: string
}

export const seedCommand: CommandModule<ParseProps, ParseProps> = {
  builder: (argv) =>
    argv
      .options({
        ...getStageOptions([Stage.Dev, Stage.Test]),
        ...assignUserOption,
      })
      .middleware([loadStageMiddleware, upsertUserMiddleware]),
  command: 'seed',
  describe:
    'Parse Ant Design scraped CSV files and seed to application as types',
  handler: async ({ email }) => {
    const userRepository = new UserRepository()

    const selectedAuth0Id = email
      ? (await userRepository.findOne({ email }))?.auth0Id
      : (await inquirer.prompt([await selectUserPrompt()])).selectedAuth0Id

    if (!selectedAuth0Id) {
      throw new Error('User not found!')
    }

    const user: IAuth0Owner = { auth0Id: selectedAuth0Id }

    await new SeedDataService().execute(user)

    return process.exit(0)
  },
}
