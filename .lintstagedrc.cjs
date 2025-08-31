module.exports = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': (files) => {
    const stagedFiles = files.join(' ')

    // Use lint-staged specific ESLint config that handles all rule overrides
    const cmd = `cross-env ESLINT_USE_FLAT_CONFIG=true eslint --config scripts/eslint/lint-staged/lint-staged.eslint.mjs --cache --fix --quiet ${stagedFiles}`

    console.info(`Running: ${cmd}`)

    return cmd
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
