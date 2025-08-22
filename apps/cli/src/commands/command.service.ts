import type {
  PackerService,
  // ScrapeAntdService,
  // ScrapeHtmlService,
  TasksService,
  TerraformService,
} from '@codelab/backend/infra/adapter/cli'

import { Injectable } from '@nestjs/common'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

@Injectable()
export class CommandService {
  constructor(
    private readonly packerService: PackerService,
    // private readonly scrapeAntdService: ScrapeAntdService,
    // private readonly scrapeHtmlService: ScrapeHtmlService,
    private readonly terraformService: TerraformService,
    private readonly tasksService: TasksService,
  ) {}

  exec() {
    /**
     * --runtimeArgs doesn't allow positional args, so we pass as single string then convert back to positional
     */
    const args = hideBin(process.argv)

    // const args = hideBin(process.argv)[0]?.split(' ')

    yargs(args)
      .scriptName('cli')
      // Add global stage option that's required
      .option('stage', {
        alias: 's',
        describe: 'Deployment stage',
        type: 'string',
        choices: ['dev', 'test', 'ci', 'prod'],
        demandOption: true,
        global: true,
      })
      /**
       * These scripts could act on different deployment environment, so we group under `data`
       */
      // .command(this.seedService)
      /**
       * These scripts don't require env to be explicitly set
       */
      .command(this.tasksService)
      /**
       * This uses puppeteer to scrape the API documentation as CSV file
       */
      // .command('scrape', 'Antd / Html', (argv) =>
      //   argv.command(this.scrapeAntdService).command(this.scrapeHtmlService),
      // )
      /**
       * Packer - Machine image builder
       */
      .command(this.packerService)
      /**
       * Terraform
       */
      .command(this.terraformService)
      .demandCommand(1)
      // Must add this to throw error for unknown arguments
      .strict()
      .showHelpOnFail(true)
      .exitProcess(true) // Ensure yargs exits the process
      .parseSync()
  }
}
