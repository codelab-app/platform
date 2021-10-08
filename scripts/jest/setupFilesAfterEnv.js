const shell = require('shelljs')
const { env } = require('../env-config')

global.beforeAll(async () => {
  // shell.exec(`yarn cli dgraph reset-data --env ${env}`)
})
