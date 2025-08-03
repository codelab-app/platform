module.exports = {
  /**
   * Disable since we need to pick up the right eslint, and takes time
   */
  // '**/*.{js,jsx,ts,tsx}': (files) => {
  //   const stagedFiles = files.join(' ')

  //   const rules = `
  //     --rule 'unused-imports/no-unused-imports: 2'
  //     --rule '@typescript-eslint/no-floating-promises: off'
  //     --rule '@typescript-eslint/no-unnecessary-condition: off'
  //   `

  //   // Note: lint-staged runs commands outside of Nx project context, which means:
  //   // - Project-specific ESLint configurations may not be properly resolved
  //   // - Nx project graph information is not available
  //   // - This can lead to false positives or missing project-specific rules

  //   // Using --cache to improve performance by caching results between runs
  //   // Cache limitations: May not catch errors involving cross-file dependencies
  //   // or TypeScript type information changes between cached runs
  //   const cmds = [
  //     `cross-env eslint --cache --color ${stagedFiles} ${rules} --fix --quiet`,
  //   ]

  //   // TODO: Consider batching large file lists to avoid command line length limits
  //   // and improve performance when many files are staged

  //   console.info(`Running: ${cmds}`)

  //   return cmds
  // },
  '**/*.{json,graphql,yml,yaml}': (files) => {
    const stagedFiles = files.join(' ')
    // Using --cache to improve performance by caching formatting results
    const cmd = `prettier --config .prettierrc --cache --write ${stagedFiles}`

    console.info(`Running: ${cmd}`)

    return [cmd]
  },
  '.circleci/**/*.yml': ['pnpm cpack', 'git add .circleci/**/*'],
}
