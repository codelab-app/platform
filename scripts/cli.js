#!/usr/bin/env node

/**
 * Thin wrapper to parse env, so we load correct `.env`
 */

const findUp = require('find-up')
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')
const shell = require('shelljs')
const path = require('path')

/**
 * We create wrapper around our cli commands so we can load env vars as needed. Calling nx will automatically load `.env`, we'll have to wait until this PR gets published to nrwl https://github.com/nrwl/nx/issues/5426
 *
 * Having our own CLI commands also makes it more self documenting on what commands are possible. Think of this as docs for devs, it creates a better DX.
 */
const { _, env, ...props } = yargs(hideBin(process.argv))
  // Commands
  .command(
    'codegen',
    'Generate typescript types from GraphQL files',
    // () => {},
    // (argv) => {
    //   // console.log('codegen')
    // },
  )
  .command('e2e', 'Run Cypress e2e specs, will start servers as needed')
  // Options
  .option('env', {
    type: 'string',
    choices: ['dev', 'local', 'ci'],
    describe: 'Used to load proper `.env`',
  })
  .demandCommand(1, 'Please provide a command')
  .demandOption(['env'], 'Please provide an environment').argv

const cmd = _[0]

// We want to build the `cli` app first
if (!process.env.CI) {
  if (shell.exec('npx nx build cli --verbose').code !== 0) {
    shell.exit(1)
  }
}

// `local` is used for pre-push checks. Only `local` uses different port because a dev server may be running, `ci` & `dev` both use normal port.
switch (env) {
  case 'local':
    if (
      shell.exec(
        `npx env-cmd -f .env.test node dist/apps/cli/main.js ${cmd} --env ${env}`,
      ).code !== 0
    ) {
      shell.exit(1)
    }
    break
  case 'dev':
    if (
      shell.exec(
        `npx env-cmd -f .env node dist/apps/cli/main.js ${cmd} --env ${env}`,
      ).code !== 0
    ) {
      shell.exit(1)
    }
    break
  case 'ci':
    if (
      shell.exec(`node dist/apps/cli/main.js ${cmd} --env ${env}`).code !== 0
    ) {
      shell.exit(1)
    }
    break
  default:
    throw new Error(`${env} is not a valid environment`)
    break
}
