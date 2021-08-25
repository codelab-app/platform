const path = require('path')

// eslint-disable-next-line padding-line-between-statements
const config = path.resolve(process.cwd(), './tailwind.config.js')

module.exports = {
  twin: {
    config,
    preset: 'emotion',
  },
}
