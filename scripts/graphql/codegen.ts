#!/usr/bin/env ts-node

/**
 *  Use `-w` to watch
 */

const argv = require('yargs/yargs')(process.argv.slice(2)).argv
const chokidar = require('chokidar')
const shell = require('shelljs')

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
  if (!shell.exec('ts-node libs/dgraph/src/schema/generateSchema.ts')) {
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
    .on('all', (event, path, stats) => {
      console.log(event, path)

      codegen()
    })
}
