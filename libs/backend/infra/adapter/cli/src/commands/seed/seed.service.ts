import type { IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { Argv, CommandModule } from 'yargs'
import { globalHandler } from '../../shared/handler'

@Injectable()
export class SeedService implements CommandModule<unknown> {
  command = 'seed'

  describe =
    'Parse Ant Design scraped CSV files and seed to application as types'

  builder(argv: Argv<unknown>) {
    return argv
      .command(
        'antd',
        'Seed Ant Design framework',
        (_argv) => _argv,
        globalHandler(async ({ user }) => {
          const owner = user as IAuth0User
          // await new AdminSeederService(owner).seedAntDesign()
        }),
      )
      .command(
        'html',
        'Seed html',
        (_argv) => _argv,
        globalHandler(async ({ user }) => {
          const owner = user as IAuth0User

          // await new AdminSeederService(owner).seedHtml()
        }),
      )
      .demandCommand()
  }

  handler() {
    // await new SeedDataService().execute(user)
  }
}
