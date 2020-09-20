const { ESLint } = require('eslint')

const eslint = new ESLint({})

// Add remove un-used when pushing only a
const rules = `--rule 'unused-imports/no-unused-imports-ts: 2'`

module.exports = {
  '**/*.{ts,tsx}': (files) => {
    const processedFiles = files
      .map((file) => `${file}`)
      .filter(async (file) => !(await eslint.isPathIgnored(file)))
      .join(' ')

    const cmd = `eslint ${processedFiles} ${rules} --fix`

    console.log(`Running: ${cmd}`)

    return cmd
  },
  // '*.{ts,tsx,json,graphql,md}': files => `gulp prettify --files
  // ${files.filter(file => true)}`,
}
