module.exports = {
  '**/*.{js,jsx,ts,tsx}': (files) => {
    const stagedFiles = files.join(' ')

    const rules = `
      --rule 'unused-imports/no-unused-imports-ts: 2'
    `

    const cmds = [
      `cross-env NODE_OPTIONS=--max-old-space-size=8192 eslint ${stagedFiles} ${rules} --fix`,
      `madge --circular ${stagedFiles} --extensions ts,tsx,js,jsx`,
    ]

    console.log(`Running: ${cmds}`)

    return cmds
  },
  '**/*.{json,graphql,yml,yaml}': (files) => {
    const stagedFiles = files.join(' ')
    const cmd = `prettier --config .prettierrc.json --write ${stagedFiles}`

    console.log(`Running: ${cmd}`)

    return cmd
  },
  // '**/*.{.tf}': (files) => {
  //   const stagedFiles = files.join(' ')

  //   const cmd = `tflint --write ${stagedFiles}`

  //   // console.log(`Running: ${cmd}`)

  //   return `terraform fmt -recursive .terraform && tflint .terraform`
  // },
}
