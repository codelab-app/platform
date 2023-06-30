import { TextDecoder, TextEncoder } from 'util'

require('reflect-metadata')

/**
 * https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
 */
Object.assign(global, { TextDecoder, TextEncoder })

const { config } = require('dotenv')
const fs = require('fs')
const path = require('path')

const envPath = path.resolve(__dirname, '../../.env.test')

// Only load if test env & file exists
if (process.env.NODE_ENV === 'test' && fs.existsSync(envPath)) {
  config({ path: envPath })
}
