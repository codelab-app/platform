require('reflect-metadata')

const { config } = require('dotenv')
const fs = require('fs')
const path = require('path')

const envPath = path.resolve(__dirname, '../../.env.test')

// Only load if test env & file exists
if (process.env.NODE_ENV === 'test' && fs.existsSync(envPath)) {
  console.log('Loading from .env.test')
  config({ path: envPath })
}
