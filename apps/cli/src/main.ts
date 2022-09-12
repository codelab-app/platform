/**
 * Thin wrapper to parse env, so we load correct `.env`
 */
import './utils/loadEnv'
import dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { exportCommand } from './commands/export/export.command'
import { importCommand } from './commands/import/import.command'
import { resetCommand } from './commands/reset/reset.command'
import { Stage } from './utils/env'
import { requireTestEnvOptions } from './utils/options'
import { runTasks } from './utils/run-tasks'
import { Tasks } from './utils/tasks'
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

    // Load prod env only if not CI
    if (stage === Stage.Prod && !process.env.CI) {
      dotenv.config({ path: '.env.prod', override: true })
      console.log(process.env.NEO4J_URI)
    }

    if (stage === Stage.Dev && !process.env.CI) {
      dotenv.config({ path: '.env', override: true })
      console.log(process.env.NEO4J_URI)
    }
  })

  //
  // Reset data
  //
  .command(resetCommand)

  /**
   * Export/import data
   *
   * - import also seeds data
   */
  .command(importCommand)
  .command(exportCommand)

  //
  // Task
  //
  .command(
    'tasks',
    'Run tasks',
    (_yargs) =>
      _yargs
        .command(Tasks.Unit, 'Run unit tests', requireTestEnvOptions, (argv) =>
          runTasks(argv.env, `${argv._[1]}`),
        )
        .command(
          Tasks.Int,
          'Run integration tests',
          requireTestEnvOptions,
          (argv) => runTasks(argv.env, `${argv._[1]}`),
        )
        .command(Tasks.E2e, 'Run e2e tests', requireTestEnvOptions, (argv) =>
          runTasks(argv.env, `${argv._[1]}`),
        )
        .command(Tasks.Lint, 'Lint projects', requireTestEnvOptions, (argv) =>
          runTasks(argv.env, `${argv._[1]}`),
        )
        .command(Tasks.Format, 'Format files', requireTestEnvOptions, (argv) =>
          runTasks(argv.env, `${argv._[1]}`, `${argv._[2]}`),
        )
        .command(
          Tasks.Commitlint,
          'Commitlint projects',
          requireTestEnvOptions,
          (argv) => runTasks(argv.env, `${argv._[1]}`, `${argv._[2]}`),
        )
        .command(Tasks.Build, 'Build projects', requireTestEnvOptions, (argv) =>
          runTasks(argv.env, `${argv._[1]}`),
        )
        .demandCommand(1, 'Please provide a task').argv,
  )

  //
  // Ts Parser
  //
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
//   .strict()
//   .parse()
//   .help()
