#!/usr/bin/env node

const shell = require('shelljs')
const { exit } = require('yargs')
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')

const { argv } = yargs(hideBin(process.argv))
// .command(
//   'echo hi',
//   'start the server',
//   (_yargs) => {
//     console.log(_yargs)
//   },
//   (_argv) => {
//     console.log(_argv)
//   },
// )

if (!argv.port) {
  console.info(
    'Please specify port using --port, "--port 8080" for application or "--port 8082" for testing',
  )
  exit(0)
}

if (
  !shell.exec(
    `curl -X POST localhost:${argv.port}/admin/schema --data-binary '@dgraph/schema.generated.graphql'`,
  )
) {
  shell.echo('Codegen failed')
  shell.exit(1)
}
