import { PuppeteerService } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { ConsoleService } from 'nestjs-console'

@Injectable()
export class AppService {
  constructor(
    private readonly consoleService: ConsoleService,
    private readonly puppeteerService: PuppeteerService,
  ) {
    const cli = this.consoleService.getCli()

    if (!cli) {
      return
    }

    //   this.consoleService.createCommand(
    //     {
    //       command: 'seed',
    //       // options: [{}],
    //       description: 'Seed project with atoms & props',
    //     },
    //     this.seedDbService.seedDB.bind(this),
    //     cli,
    //   )

    this.consoleService.createCommand(
      {
        command: 'scrape',
        description: 'Scrape docs from AntD',
      },
      this.puppeteerService.scrape.bind(this),
      cli,
    )
  }
}
