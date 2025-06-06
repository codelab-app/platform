import {
  // ScrapeAntdService,
  // ScrapeHtmlService,
  TaskService,
  TerraformService,
} from '@codelab/backend/infra/adapter/cli'
import { Injectable } from '@nestjs/common'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

@Injectable()
export class CommandService {
  constructor(
    // private readonly scrapeAntdService: ScrapeAntdService,
    // private readonly scrapeHtmlService: ScrapeHtmlService,
    private readonly terraformService: TerraformService,
    private readonly taskService: TaskService,
  ) {}

  exec() {
    /**
     * --runtimeArgs doesn't allow positional args, so we pass as single string then convert back to positional
     */
    const args = hideBin(process.argv)

    // const args = hideBin(process.argv)[0]?.split(' ')

    void yargs(args)
      .scriptName('cli')
      /**
       * These scripts could act on different deployment environment, so we group under `data`
       */
      // .command(this.seedService)
      /**
       * These scripts don't require env to be explicitly set
       */
      .command(this.taskService)
      /**
       * This uses puppeteer to scrape the API documentation as CSV file
       */
      // .command('scrape', 'Antd / Html', (argv) =>
      //   argv.command(this.scrapeAntdService).command(this.scrapeHtmlService),
      // )
      /**
       * Terraform
       */
      .command(this.terraformService)
      .demandCommand(1)
      // Must add this to throw error for unknown arguments
      .strict().argv
  }
}
