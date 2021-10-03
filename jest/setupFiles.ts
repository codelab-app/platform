const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { config } = require('dotenv')
const path = require('path')

export const env = process.env.CI ? 'ci' : 'test'

const envPath =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, '../.env.test')
    : path.resolve(__dirname, '../.env')

// console.info(`Loading env from ${envPath}`)

config({ path: envPath })
configure({ adapter: new Adapter() })
