import { TextDecoder, TextEncoder } from 'util'
import path from 'path'
import fs from 'fs'
import { config } from 'dotenv'

require('reflect-metadata')

/**
 * https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
 */
Object.assign(global, { TextDecoder, TextEncoder })

// Only load if test env & file exists
if (process.env.NODE_ENV === 'test') {
  const envPath = path.resolve(__dirname, '../../.env.test')

  if (fs.existsSync(envPath)) {
    config({ path: envPath })
  }

  const platformApiEnvPath = path.resolve(
    __dirname,
    '../../apps/platform-api/.env.test',
  )

  if (fs.existsSync(platformApiEnvPath)) {
    config({ path: platformApiEnvPath })
  }
}
