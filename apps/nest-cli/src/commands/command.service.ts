import {
  exportCommand,
  importCommand,
  ImportService,
  resetCommand,
  scrapeAntdCommand,
  scrapeHtmlCommand,
  seedCommand,
  tasksCommand,
  terraformCommand,
} from '@codelab/backend/infra/adapter/cli'
import { Global, Injectable } from '@nestjs/common'
import type { Argv } from 'yargs'
import yargs, { CommandModule, scriptName } from 'yargs'
import { hideBin } from 'yargs/helpers'

@Injectable()
export class CommandService {
  constructor(private readonly importService: ImportService) {}

  exec() {
    void yargs(hideBin(process.argv))
      .scriptName('cli')
      /**
       * These scripts could act on different deployment environment, so we group under `data`
       */
      .command(seedCommand)
      .command(resetCommand)
      .command(this.importService)
      .command(exportCommand)
      /**
       * These scripts don't require env to be explicitly set
       */
      .command(tasksCommand)
      /**
       * This uses puppeteer to scrape the API documentation as CSV file
       */
      // .command(scrapeCommand)
      .command('scrape', 'Antd / Html', (argv) =>
        argv.command(scrapeAntdCommand).command(scrapeHtmlCommand),
      )

      /**
       * Terraform
       */
      .command(terraformCommand)
      .demandCommand(1, 'Please provide a command')
      // Must add this to throw error for unknown arguments
      .strict().argv
  }
}
