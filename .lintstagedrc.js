module.exports = {
  '**/*.{js,jsx,ts,tsx}': (files) => {
    const stagedFiles = files.join(' ')

    const rules = `
      --rule 'unused-imports/no-unused-imports-ts: 2'
    `

    const cmds = [
      `cross-env NODE_OPTIONS=--max-old-space-size=8192 eslint --color ${stagedFiles} ${rules} --fix --quiet`,
    ]

    console.info(`Running: ${cmds}`)

    return cmds
  },
  '**/*.{json,graphql,yml,yaml}': (files) => {
    const stagedFiles = files.join(' ')
    const cmd = `prettier --config .prettierrc --write ${stagedFiles}`

    console.info(`Running: ${cmd}`)

    return [cmd]
  },
  '.circleci/**/*.yml': ['pnpm cpack', 'git add .circleci/**/*'],
}
