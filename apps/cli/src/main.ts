/**
 * Thin wrapper to parse env, so we load correct `.env`
 */
import 'source-map-support/register'
import {
  exportCommand,
  scrapeAntdCommand,
  scrapeHtmlCommand,
  seedCommand,
} from '@codelab/backend/infra/adapter/cli'
import { registerCustomOTel } from '@codelab/shared/infra/otel'
import { config } from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const sdk = registerCustomOTel('codelab-cli')

// Assume `.env` if no other middleware
config({})

/**
 * We create wrapper around our cli commands so we can load env vars as needed. Calling nx will automatically load `.env`, we'll have to wait until this PR gets published to nrwl https://github.com/nrwl/nx/issues/5426
 *
 * Having our own CLI commands also makes it more self documenting on what commands are possible. Think of this as docs for devs, it creates a better DX.
 */
void yargs(hideBin(process.argv))
  /**
   * These scripts could act on different deployment environment, so we group under `data`
   */
  .command('data', 'Import / export / reset', (argv) =>
    argv
      .command(seedCommand)
      .command(exportCommand)
      /**
       * Here we initialize all data, data ID is created so may duplicate data
       *
       * - Basic Types
       * - Atoms & interfaces
       */
      .demandCommand(1, 'Please provide a command'),
  )

  /**
   * These scripts don't require env to be explicitly set
   */
  // .command(tasksCommand)
  /**
   * This uses puppeteer to scrape the API documentation as CSV file
   */
  .command('scrape', 'Antd / Html', (argv) =>
    argv.command(scrapeAntdCommand).command(scrapeHtmlCommand),
  )

  /**
   * Terraform
   */
  // .command(terraformCommand)
  .demandCommand(1, 'Please provide a command')
  // Must add this to throw error for unknown arguments
  .strict().argv
