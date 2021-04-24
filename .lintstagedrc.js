// Add remove un-used when pushing only a
const rules = `--rule 'unused-imports/no-unused-imports-ts: 2'`

module.exports = {
  '**/*.{js,ts,tsx}': (files) => {
    const stagedFiles = files.join(' ')

    const cmd = `cross-env NODE_OPTIONS=--max-old-space-size=8192 eslint ${stagedFiles} ${rules} --fix`

    console.log(`Running: ${cmd}`)

    return cmd
  },
  '**/*.{json,graphql,yml,yaml}': (files) => {
    const stagedFiles = files.join(' ')

    const cmd = `prettier --write ${stagedFiles}`

    console.log(`Running: ${cmd}`)

    return cmd
  },
  '**/*.{.tf}': (files) => {
    const stagedFiles = files.join(' ')

    const cmd = `tflint --write ${stagedFiles}`

    // console.log(`Running: ${cmd}`)

    return `terraform fmt -recursive .terraform && tflint .terraform`
  },
}
