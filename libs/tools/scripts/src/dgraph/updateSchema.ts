#!/usr/bin/env node

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
    `curl -X POST localhost:${argv.port}/admin/schema --data-binary '@dgraph/schema.generated.graphql'`,
  )
) {
  shell.echo('Codegen failed')
  shell.exit(1)
}
