#!/usr/bin/env ts-node

/**
 *  Use `-w` to watch
 */

import chokidar from 'chokidar'
import shell from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

const { argv } = yargs(hideBin(process.argv)) as any
const options = { ignoreInitial: true, awaitWriteFinish: true }

if (!argv.port) {
  console.info(
    'Please specify port using --port, "--port 8081" for application or "--port 8082" for testing',
  )

  process.exit(1)
}

const codegen = () => {
  if (
    shell.exec(
      'yarn cross-env DOTENV_CONFIG_PATH=.env graphql-codegen --require dotenv/config --config .graphqlconfig.yaml',
    ).code !== 0
  ) {
    shell.echo('Codegen failed')
    shell.exit(1)
  }
}

const updateSchema = () => {
  if (
    shell.exec(
      `ts-node libs/tools/scripts/src/dgraph/generateSchema.ts --port=${argv.port}`,
    ).code !== 0
  ) {
    shell.echo('Failed to generate Dgraph schema')
    shell.exit(1)
  }

  if (
    shell.exec(
      `ts-node libs/tools/scripts/src/dgraph/updateSchema.ts --port=${argv.port}`,
    ).code !== 0
  ) {
    shell.echo('Failed to update Dgraph schema')
    shell.exit(1)
  }
}

updateSchema()
codegen()

/**
 * Watch Dgraph schema
 */
if (argv.w) {
  chokidar.watch('dgraph/schema.graphql', options).on('all', (event, path) => {
    console.log(event, path)

    updateSchema()
    codegen()
  })

  chokidar
    .watch('libs/modules/**/*.d.graphql', options)
    .on('all', (event, path) => {
      console.log(event, path)

      codegen()
    })
}
