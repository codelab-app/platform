/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Needs to use require since .eslintrc loads using commonjs
 */
export {}
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
// const util = require('util')

let eslintrc: any

try {
  const file = path.resolve(__dirname, '../.eslintrc.base.yml')

  eslintrc = yaml.safeLoad(fs.readFileSync(file, 'utf8'))
  // console.log(util.inspect(doc, false, null, true))
  // fs.writeFileSync(path.resolve(__dirname, '.eslintrc'), eslintrc);
} catch (e) {
  console.log(e)
}

module.exports = eslintrc
