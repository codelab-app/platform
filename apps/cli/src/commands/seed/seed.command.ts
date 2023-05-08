import { AdminSeederService } from '@codelab/backend/application/admin'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import type { CommandModule } from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import {
  assignUserOption,
  selectUser,
  upsertUserMiddleware,
} from '../../shared/path-args'
import { Stage } from '../../shared/utils/stage'

export interface SeedCommandOptions {
  // email: string
  // stage: Stage
  user: IAuth0Owner
}

export const seedCommand: CommandModule = {
  builder: (argv) =>
    argv
      .options({
        ...getStageOptions([Stage.Dev, Stage.Test]),
        ...assignUserOption,
      })
      .middleware([loadStageMiddleware, upsertUserMiddleware, selectUser])
      .command(
        'antd',
        'Seed Ant Design framework',
        (_argv) => _argv,
        async ({ user }) => {
          const owner = user as IAuth0Owner

          await new AdminSeederService(owner).seedAntDesign()

          process.exit(0)
        },
      )
      .command(
        'html',
        'Seed html',
        (_argv) => _argv,
        async ({ user }) => {
          const owner = user as IAuth0Owner

          await new AdminSeederService(owner).seedHtml()

          process.exit(0)
        },
      )
      .demandCommand(),
  command: 'seed',
  describe:
    'Parse Ant Design scraped CSV files and seed to application as types',
  handler: async ({ email }) => {
    // await new SeedDataService().execute(user)
  },
}
