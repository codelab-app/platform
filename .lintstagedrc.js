const { ESLint } = require('eslint')

const eslint = new ESLint({})

module.exports = {
  '**/*.{ts,tsx}': (files) => {
    const processedFiles = files
      .map((file) => `${file}`)
      .filter(async (file) => !(await eslint.isPathIgnored(file)))
      .join(' ')

    const cmd = `eslint ${processedFiles} --fix`

    console.log(`Running: ${cmd}`)

    return cmd
  },
  // '*.{ts,tsx,json,graphql,md}': files => `gulp prettify --files
  // ${files.filter(file => true)}`,
}
