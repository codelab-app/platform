import type { IOwner } from '@codelab/backend/abstract/core'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedAntDesignApiService,
  SeedAntDesignFieldsService,
  SeedSystemTypeService,
} from '@codelab/backend/application/type'
import { UserRepository } from '@codelab/backend/domain/user'
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
      ? (await userRepository.find({ email }))?.auth0Id
      : (await inquirer.prompt([await selectUserPrompt()])).selectedAuth0Id

    if (!selectedAuth0Id) {
      throw new Error('User not found!')
    }

    const user: IOwner = { auth0Id: selectedAuth0Id }

    await new SeedSystemTypeService().execute(user)

    await new SeedAntDesignApiService().execute(user)

    await new SeedTagsService().execute(user)

    await new SeedAtomsService().execute(user)

    await (await SeedAntDesignFieldsService.init(user)).execute()

    return process.exit(0)
  },
}
