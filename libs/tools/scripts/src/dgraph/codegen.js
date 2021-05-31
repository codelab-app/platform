#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 *  Use `-w` to watch
 */

const shell = require('shelljs')
const chokidar = require('chokidar')
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')

const { argv } = yargs(hideBin(process.argv))

// eslint-disable-next-line padding-line-between-statements
const options = { ignoreInitial: true, awaitWriteFinish: true }

const codegen = () => {
  if (
    !shell.exec(
      'yarn cross-env DOTENV_CONFIG_PATH=.env graphql-codegen --require dotenv/config --config .graphqlconfig.yaml',
    )
  ) {
    shell.echo('Codegen failed')
    shell.exit(1)
  }
}

const updateSchema = () => {
  if (!shell.exec('ts-node libs/tools/scripts/src/dgraph/generateSchema.js')) {
    shell.echo('Failed to generate Dgraph schema')
    shell.exit(1)
  }

  if (!shell.exec('yarn dgraph:schema:update')) {
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
