const shell = require('shelljs')
const { env } = require('../env-config')

module.exports = async () => {
  shell.exec(`yarn cli dgraph update-schema --env ${env}`)
}
