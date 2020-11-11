#!/usr/bin/env node

/**
 * Triggered by CircleCI
 */

const path = require('path')
const shell = require('shelljs')

const { CIRCLE_BASE_REVISION, CIRCLE_SHA1 } = process.env

if (!CIRCLE_BASE_REVISION) {
  shell.echo(
    `CIRCLE_BASE_REVISION has invalid value: "${CIRCLE_BASE_REVISION}"`,
  )
  shell.exit(1)
}

if (!CIRCLE_SHA1) {
  shell.echo(`CIRCLE_SHA1 has invalid value: "${CIRCLE_BASE_REVISION}"`)
  shell.exit(1)
}

/**
 * Files modified since base revision, could contain files from several commits.
 */
const filesSinceBaseRevision = shell
  .exec(
    `git diff-tree --no-commit-id --name-only --diff-filter=d -r ${CIRCLE_BASE_REVISION} ${CIRCLE_SHA1}`,
    { silent: true },
  )
  .stdout.trim()
  .split('\n')

shell.echo(
  `CIRCLE_BASE_REVISION=${CIRCLE_BASE_REVISION}`,
  `CIRCLE_SHA1=${CIRCLE_SHA1}`,
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
