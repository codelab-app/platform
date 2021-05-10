const chokidar = require('chokidar')
const shell = require('shelljs')

const options = { ignoreInitial: true, awaitWriteFinish: true }

const codegen = () => {
  if (!shell.exec('yarn codegen')) {
    shell.echo('Codegen failed')
    shell.exit(1)
  }
}

const updateSchema = () => {
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
