import { Injectable } from '@nestjs/common'
import type { Argv, CommandModule } from 'yargs'

@Injectable()
export class SeedService implements CommandModule<unknown> {
  command = 'seed'

  describe =
    'Parse Ant Design scraped CSV files and seed to application as types'

  constructor() {
    this.builder = this.builder.bind(this)
  }

  builder(argv: Argv<unknown>) {
    return argv
      .command(
        'antd',
        'Seed Ant Design framework',
        (_argv) => _argv,
        async ({ user }) => {
          const owner = user
          // await new AdminSeederService(owner).seedAntDesign()
        },
      )
      .command(
        'html',
        'Seed html',
        (_argv) => _argv,
        async ({ user }) => {
          const owner = user

          // await new AdminSeederService(owner).seedHtml()
        },
      )
      .demandCommand()
  }

  handler() {
    // await new SeedDataService().execute(user)
  }
}
