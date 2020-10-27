#!/usr/bin/env node

/**
 * Triggered by CircleCI
 */

const path = require('path')
const shell = require('shelljs')

/**
 * Files modified since base revision, could contain files from several commits.
 */
const filesSinceBaseRevision = shell
  .exec(
    `git diff-tree --no-commit-id --name-only --diff-filter=d -r ${process.env.CIRCLE_BASE_REVISION} ${process.env.CIRCLE_REVISION}`,
    { silent: true },
  )
  .stdout.trim()
  .split('\n')

shell.echo(
  `CIRCLE_BASE_REVISION=${process.env.CIRCLE_BASE_REVISION}`,
  `CIRCLE_REVISION=${process.env.CIRCLE_REVISION}`,
)
shell.echo(`Files since base revision: ${filesSinceBaseRevision}`)

const filesToLint = filesSinceBaseRevision
  .filter((file) => {
    return (
      // !(await eslint.isPathIgnored(file)) &&
      ['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(file))
    )
  })
  .join(' ')

shell.echo(`Linting: ${filesToLint}`)

const { code, stderr, stdout } = shell.exec(`npx eslint ${filesToLint}`)

if (code !== 0) {
  shell.echo(stderr)
  shell.exit(1)
} else {
  shell.echo(stdout)
}
