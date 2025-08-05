module.exports = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': (files) => {
    const stagedFiles = files.join(' ')

    // Disable rules that require project-specific context
    const rules = `
      --rule 'unused-imports/no-unused-imports: 2'
      --rule '@typescript-eslint/no-floating-promises: off'
      --rule '@typescript-eslint/no-unnecessary-condition: off'
      --rule 'import-x/no-unresolved: off'
      --rule 'import-x/named: off'
      --rule 'import-x/namespace: off'
      --rule 'import-x/default: off'
      --rule 'import-x/export: off'
      --rule 'import-x/no-named-as-default: off'
      --rule 'import-x/no-named-as-default-member: off'
      --rule 'import-x/no-extraneous-dependencies: off'
      --rule '@nx/enforce-module-boundaries: off'
    `

    // Force ESLint to use flat config
    const cmds = [
      `cross-env ESLINT_USE_FLAT_CONFIG=true eslint --cache --fix --quiet ${stagedFiles} ${rules}`,
    ]

    console.info(`Running: ${cmds}`)

    return cmds
  },
  '**/*.{json,graphql,yml,yaml}': (files) => {
    const stagedFiles = files.join(' ')
    // Using --cache to improve performance by caching formatting results
    const cmd = `prettier --config .prettierrc --cache --write ${stagedFiles}`

    console.info(`Running: ${cmd}`)

    return [cmd]
  },
  '.circleci/**/*.yml': ['pnpm cpack', 'git add .circleci/**/*'],
}
