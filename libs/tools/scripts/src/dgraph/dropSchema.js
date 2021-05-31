#!/usr/bin/env node

const shell = require('shelljs')
const { exit } = require('yargs')
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')

const { argv } = yargs(hideBin(process.argv))

if (!argv.port) {
  console.info(
    'Please specify port using --port, "--port 8081" for application or "--port 8082" for testing',
  )

  return
}

if (
  !shell.exec(
    `curl -X POST localhost:${argv.port}/alter -d '{"drop_all": true}'`,
  )
) {
  shell.echo('Codegen failed')
  shell.exit(1)
}
