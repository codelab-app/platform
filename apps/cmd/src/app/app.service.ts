import { PuppeteerService } from '@codelab/backend/infra'
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
