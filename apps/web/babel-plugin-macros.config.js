const path = require('path')

const config = path.resolve(process.cwd(), './tailwind.config.js')

module.exports = {
  twin: {
    config,
    preset: 'emotion',
  },
}
