import { SeedDataService } from '@codelab/backend/application/admin'
import { antdTagTree } from '@codelab/backend/infra/data/seed'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
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
        'Seed html',
        (_argv) => _argv,
        async ({ user }) => {
          await new SeedDataService({
            tagTreeData: antdTagTree,
          }).execute(user as IAuth0Owner)

          process.exit(0)
        },
      )
      .command(
        'html',
        'Seed html',
        (_argv) => _argv,
        ({ user }) => {
          console.log(user)

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
