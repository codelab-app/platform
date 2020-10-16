// Add remove un-used when pushing only a
const rules = `--rule 'unused-imports/no-unused-imports-ts: 2'`

module.exports = {
  '**/*.{ts,tsx}': (files) => {
    const allFiles = files.join(' ')

    const cmd = `cross-env NODE_OPTIONS=--max-old-space-size=4096 eslint ${allFiles} ${rules} --fix`

    console.log(`Running: ${cmd}`)

    return cmd
  },
  // '*.{ts,tsx,json,graphql,md}': files => `gulp prettify --files
  // ${files.filter(file => true)}`,
}
