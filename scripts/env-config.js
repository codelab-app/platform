const path = require('path')

const env = process.env.CI ? 'ci' : 'test'

exports.env = env

const envPath =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, '../.env.test')
    : path.resolve(__dirname, '../.env')

exports.envPath = envPath
