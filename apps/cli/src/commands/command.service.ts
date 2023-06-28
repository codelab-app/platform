import {
  ExportService,
  ImportService,
  ResetService,
  ScrapeAntdService,
  ScrapeHtmlService,
  SeedService,
  ServerlessService,
  TaskService,
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
    private readonly taskService: TaskService,
    private readonly resetService: ResetService,
    private readonly exportService: ExportService,
    private readonly seedService: SeedService,
    private readonly scrapeAntdService: ScrapeAntdService,
    private readonly scrapeHtmlService: ScrapeHtmlService,
  ) {}

  exec() {
    // console.log('Process.argv', hideBin(process.argv))

    void yargs(hideBin(process.argv))
      .scriptName('cli')
      /**
       * These scripts could act on different deployment environment, so we group under `data`
       */
      .command(this.seedService)
      .command(this.resetService)
      .command(this.importService)
      .command(this.serverlessService)
      .command(this.exportService)
      /**
       * These scripts don't require env to be explicitly set
       */
      .command(this.taskService)
      /**
       * This uses puppeteer to scrape the API documentation as CSV file
       */
      .command('scrape', 'Antd / Html', (argv) =>
        argv.command(this.scrapeAntdService).command(this.scrapeHtmlService),
      )
      /**
       * Terraform
       */
      .command(this.terraformService)
      .demandCommand(1)
      // Must add this to throw error for unknown arguments
      .strict().argv
  }
}
