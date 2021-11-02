/**
 * Thin wrapper to parse env, so we load correct `.env`
 */
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { Env, ENV_FLAG, envOption } from './utils/env'
import { runCli } from './utils/run-cli'

/**
 * We create wrapper around our cli commands so we can load env vars as needed. Calling nx will automatically load `.env`, we'll have to wait until this PR gets published to nrwl https://github.com/nrwl/nx/issues/5426
 *
 * Having our own CLI commands also makes it more self documenting on what commands are possible. Think of this as docs for devs, it creates a better DX.
 */
yargs(hideBin(process.argv))
  .scriptName('cli')
  //
  // Codegen
  //
  .command(
    'codegen',
    'Generate typescript types from GraphQL files',
    (_yargs) =>
      _yargs
        .option(ENV_FLAG, envOption)
        .demandOption([ENV_FLAG], 'Please provide an environment'),
    (argv) => runCli(argv.env as any, `${argv._[0]} --env ${argv.env}`),
  )
  //
  // E2e
  //
  .command(
    'e2e',
    'Run Cypress e2e specs, will start servers as needed',
    (_yargs) =>
      _yargs
        .option(ENV_FLAG, envOption)
        .demandOption([ENV_FLAG], 'Please provide an environment'),
    (argv) => runCli(argv.env as any, `${argv._[0]} --env ${argv.env}`),
  )
  //
  // Scrape
  //
  .command(
    'scrape',
    'Scrape Antd Design docs to .csv using Puppeteer',
    (_yargs) => _yargs,
    (argv) => runCli(Env.Dev, `${argv._[0]}`),
  )
  //
  // Seed
  //
  .command(
    'seed',
    'Seed Antd Design props to platform',
    (_yargs) => _yargs,
    (argv) => runCli(argv.env as any, `${argv._[0]} --env ${argv.env}`),
  )
  //
  // Start
  //
  .command(
    'start',
    'Start running development environment',
    (_yargs) => _yargs,
    (argv) => runCli(Env.Dev, `${argv._[0]}`),
  )
  //
  // Dgraph
  //
  .command(
    'dgraph',
    'Run dgraph related command',
    (_yargs) =>
      _yargs
        // .check((argv, options) => {
        //   console.log(argv, options)
        // })
        .command(
          'update-schema',
          'Update dgraph scheme',
          (__yargs) =>
            __yargs
              .option(ENV_FLAG, envOption)
              .demandOption([ENV_FLAG], 'Please provide an environment'),
          (argv) =>
            runCli(
              argv.env as any,
              `${argv._[0]} ${argv._[1]} --env ${argv.env}`,
            ),
        )
        .command(
          'reset-data',
          'Reset dgraph data',
          (__yargs) =>
            __yargs
              .option(ENV_FLAG, envOption)
              .demandOption([ENV_FLAG], 'Please provide an environment'),
          (argv) =>
            runCli(
              argv.env as any,
              `${argv._[0]} ${argv._[1]} --env ${argv.env}`,
            ),
        )
        .demandCommand(1, 'Please provide a dgraph command').argv,
  )
  //
  // Ts Parser
  //
  .command('parse-ts', 'Typescript prop types to Interface parse', (_yargs) => {
    return _yargs.command(
      'mui',
      "Parses Material UI's component declarations",
      (__yargs) =>
        __yargs.option('dir', {
          type: 'string',
          alias: 'd',
          required: true,
          describe:
            'The root directory where MUI is downloaded, e.g. ~/material-ui',
        }),
      (argv) => runCli(Env.Dev, `parse-ts mui -d ${argv.dir}`),
    )
  })
  .demandCommand(1, 'Please provide a command').argv
