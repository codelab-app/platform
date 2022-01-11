const shell = require('shelljs')
const { env } = require('../env-config')

global.beforeAll(() => {
  console.log('setupFilesAfterEnv beforeAll')
  // shell.exec(`yarn cli dgraph update-schema --env ${env}`)
})

global.beforeAll(() => {
  // shell.exec(`yarn cli dgraph reset-data --env ${env}`)
})
