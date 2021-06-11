#!/usr/bin/env ts-node

import shell from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

const { argv } = yargs(hideBin(process.argv)) as any

if (!argv.port) {
  console.info(
    'Please specify port using --port, "--port 8081" for application or "--port 8082" for testing',
  )

  process.exit(1)
}

if (
  !shell.exec(
    `curl -X POST localhost:${argv.port}/alter -d '{"drop_all": true}'`,
  )
) {
  shell.echo('Codegen failed')
  shell.exit(1)
}
