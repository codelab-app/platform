import { env } from './env'
import * as shell from 'shelljs'

global.beforeAll(async () => {
  shell.exec(`yarn cli dgraph reset-data --env ${env}`)
})
