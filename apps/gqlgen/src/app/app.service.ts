import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() {
    //   this.consoleService.createCommand(
    //     {
    //       command: 'e2e',
    //       options: [
    //         {
    //           flags: '--testPort',
    //           required: false,
    //           defaultValue: false,
    //         },
    //       ],
    //       description: 'Run Cypress e2e tests',
    //     },
    //     this.e2eService.e2e.bind(this),
    //     cli,
    //   )
    //   this.consoleService.createCommand(
    //     {
    //       command: 'seed',
    //       // options: [{}],
    //       description: 'Seed project with atoms & props',
    //     },
    //     this.seedDbService.seedDB.bind(this),
    //     cli,
    //   )
    //   this.consoleService.createCommand(
    //     {
    //       command: 'scrape',
    //       description: 'Scrape docs from AntD',
    //     },
    //     this.puppeteerService.scrape.bind(this),
    //     cli,
    //   )
  }
}
