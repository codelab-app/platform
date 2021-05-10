const chokidar = require('chokidar')
const shell = require('shelljs')

/**
 * Watch Dgraph schema
 */
chokidar.watch('dgraph/schema.graphql').on('all', (event, path) => {
  console.log(event, path)

  if (!shell.exec('yarn dgraph:schema:update')) {
    shell.echo('Failed to update Dgraph schema')
    shell.exit(1)
  }
})

chokidar.watch('libs/modules/**/*.dgraph.graphql').on('all', (event, path) => {
  console.log(event, path)

  if (!shell.exec('yarn codegen')) {
    shell.echo('Codegen failed')
    shell.exit(1)
  }
})
