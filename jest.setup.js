const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { config } = require('dotenv')

config({ path: '.env' })
configure({ adapter: new Adapter() })
