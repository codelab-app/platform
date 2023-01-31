import type { IUserRef } from '@codelab/backend/abstract/core'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedAntDesignApiService,
  SeedAntDesignFieldsService,
  SeedSystemTypeService,
} from '@codelab/backend/application/type'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
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
  command: 'seed',
  describe:
    'Parse Ant Design scraped CSV files and seed to application as types',
  builder: (argv) =>
    argv
      .options({
        ...getStageOptions([Stage.Dev, Stage.Test]),
        ...assignUserOption,
      })
      .middleware([loadStageMiddleware, upsertUserMiddleware]),
  handler: async () => {
    const selectedAuth0Id: string = (
      await inquirer.prompt([await selectUserPrompt()])
    ).selectedAuth0Id

    const user: IUserRef = { auth0Id: selectedAuth0Id }

    await new SeedSystemTypeService().execute(user)

    await new SeedAntDesignApiService().execute(user)

    await new SeedTagsService().execute(user)

    await new SeedAtomsService().execute(user)

    await (await SeedAntDesignFieldsService.init(user)).execute()

    return process.exit(0)
  },
}
