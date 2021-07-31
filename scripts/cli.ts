#!/usr/bin/env node

import { Env, envOption, ENV_FLAG } from './cli-helpers/env'

/**
 * Thin wrapper to parse env, so we load correct `.env`
 */
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { Argv } from 'yargs'
import { runCli } from './cli-helpers/run-cli'

const shell = require('shelljs')

/**
 * We create wrapper around our cli commands so we can load env vars as needed. Calling nx will automatically load `.env`, we'll have to wait until this PR gets published to nrwl https://github.com/nrwl/nx/issues/5426
 *
 * Having our own CLI commands also makes it more self documenting on what commands are possible. Think of this as docs for devs, it creates a better DX.
 */
const argv = yargs(hideBin(process.argv))
  //
  // Codegen
  //
  .command(
    'codegen',
    'Generate typescript types from GraphQL files',
    (yargs) =>
      yargs
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
    (yargs) =>
      yargs
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
    (yargs) => yargs,
    (argv) => runCli(Env.Dev, `${argv._[0]}`),
  )
  //
  // Seed
  //
  .command(
    'seed',
    'Seed Antd Design props to platform',
    (yargs) => yargs,
    (argv) => runCli(Env.Dev, `${argv._[0]}`),
  )
  .demandCommand(1, 'Please provide a command').argv
