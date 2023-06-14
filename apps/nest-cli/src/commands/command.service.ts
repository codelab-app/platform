import {
  exportCommand,
  ImportService,
  resetCommand,
  scrapeAntdCommand,
  scrapeHtmlCommand,
  seedCommand,
  ServerlessService,
  tasksCommand,
  TerraformService,
} from '@codelab/backend/infra/adapter/cli'
import { Global, Injectable } from '@nestjs/common'
import type { Argv } from 'yargs'
import yargs, { CommandModule, scriptName } from 'yargs'
import { hideBin } from 'yargs/helpers'

@Injectable()
export class CommandService {
  constructor(
    private readonly importService: ImportService,
    private readonly terraformService: TerraformService,
    private readonly serverlessService: ServerlessService,
  ) {}

  exec() {
    // this.importService.execute.bind(this)
    console.log('Process.argv', hideBin(process.argv))

    void yargs(hideBin(process.argv))
      .scriptName('cli')
      /**
       * These scripts could act on different deployment environment, so we group under `data`
       */
      // .command(seedCommand)
      // .command(resetCommand)
      .command(this.importService)
      .command(this.serverlessService)
      // .command(exportCommand)
      /**
       * These scripts don't require env to be explicitly set
       */
      // .command(tasksCommand)
      /**
       * This uses puppeteer to scrape the API documentation as CSV file
       */
      // .command('scrape', 'Antd / Html', (argv) =>
      //   argv.command(scrapeAntdCommand).command(scrapeHtmlCommand),
      // )
      /**
       * Terraform
       */
      .command(this.terraformService)
      .demandCommand(1)
      // Must add this to throw error for unknown arguments
      .strict().argv

    // process.exit(0)
    console.log('Done! Please press Ctrl+C')
  }
}
