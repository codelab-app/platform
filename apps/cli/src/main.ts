/**
 * Thin wrapper to parse env, so we load correct `.env`
 */
import dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { exportCommand } from './commands/export/export.command'
import { importCommand } from './commands/import/import.command'
import { parseCommand } from './commands/parse/parse.command'
import { resetCommand } from './commands/reset/reset.command'
import { scrapeCommand } from './commands/scrape/scrape.command'
import { tasksCommand } from './commands/tasks/tasks.command'
import { Stage } from './shared/utils/env'
/**
 * We create wrapper around our cli commands so we can load env vars as needed. Calling nx will automatically load `.env`, we'll have to wait until this PR gets published to nrwl https://github.com/nrwl/nx/issues/5426
 *
 * Having our own CLI commands also makes it more self documenting on what commands are possible. Think of this as docs for devs, it creates a better DX.
 */
yargs(hideBin(process.argv))
  .scriptName('cli')

  // All scripts here could act on a different stage
  .options({
    stage: {
      alias: 's',
      describe: 'The deployment environment',
      demandOption: true,
      default: Stage.Dev,
      type: 'string',
      choices: Object.values(Stage),
    },
  })
  // Load different env based on stage
  .middleware((argv) => {
    const { stage } = argv

    console.log('process.env.CI', process.env.CI)

    if (process.env.CI) {
      return
    }

    // Load prod env only if not CI
    if (stage === Stage.Prod) {
      dotenv.config({ path: '.env.prod', override: true })
      console.log(process.env.NEO4J_URI)
    }

    if (stage === Stage.Dev) {
      dotenv.config({ path: '.env', override: true })
      console.log(process.env.NEO4J_URI)
    }
  })

  .command(resetCommand)
  .command(importCommand)
  .command(exportCommand)
  .command(tasksCommand)
  .command(scrapeCommand)
  .command(parseCommand)

  /**
   * TS Parser
   */

  // .command('parse-ts', 'Typescript prop types to Interface parse', (_yargs) => {
  //   return _yargs.command(
  //     'mui',
  //     "Parses Material UI's component declarations",
  //     (__yargs) =>
  //       __yargs.option('dir', {
  //         type: 'string',
  //         alias: 'd',
  //         required: true,
  //         describe:
  //           'The root directory where MUI is downloaded, e.g. ~/material-ui',
  //       }),
  //     (argv) => runCli(Env.Dev, `parse-ts mui -d ${argv.dir}`),
  //   )
  // })

  .demandCommand(1, 'Please provide a command').argv
