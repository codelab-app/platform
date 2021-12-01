import { env } from './env'
import * as shell from 'shelljs'

global.beforeAll(async () => {
  // We create an adhoc env var so we can void running dgraph reset
  if (process.env.TEST_ENV !== 'unit') {
    shell.exec(`yarn cli dgraph reset-data --env ${env}`)
  }
})
