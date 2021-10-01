import { env } from './setupFiles'
import * as shell from 'shelljs'

global.beforeAll(async () => {
  shell.exec(`yarn cli dgraph reset-data --env ${env}`)
})
