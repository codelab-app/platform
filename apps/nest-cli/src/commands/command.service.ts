import { Global, Injectable } from '@nestjs/common'
import type { Argv, CommandModule } from 'yargs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

@Injectable()
export class CommandService {
  private yargs?: Argv

  constructor() {
    void yargs(hideBin(process.argv))
      // /**
      //  * These scripts could act on different deployment environment, so we group under `data`
      //  */
      // .command('data', 'Import / export / reset', (argv) =>
      //   argv
      //     .command(seedCommand)
      //     .command(resetCommand)
      //     .command(importCommand)
      //     .command(exportCommand)
      //     /**
      //      * Here we initialize all data, data ID is created so may duplicate data
      //      *
      //      * - Basic Types
      //      * - Atoms & interfaces
      //      */
      //     .demandCommand(1, 'Please provide a command'),
      // )

      /**
       * These scripts don't require env to be explicitly set
       */
      .command(tasksCommand)
      // /**
      //  * This uses puppeteer to scrape the API documentation as CSV file
      //  */
      // // .command(scrapeCommand)
      // .command('scrape', 'Antd / Html', (argv) =>
      //   argv.command(scrapeAntdCommand).command(scrapeHtmlCommand),
      // )

      // /**
      //  * Terraform
      //  */
      // .command(terraformCommand)
      // .demandCommand(1, 'Please provide a command')
      // Must add this to throw error for unknown arguments
      .strict().argv
  }
}
