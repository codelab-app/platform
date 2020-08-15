#!/usr/bin/env node

const shell = require('shelljs')
const path = require('path')

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

// console.log(filesSinceBaseRevision)

const filesToLint = filesSinceBaseRevision
  .filter((file) => {
    return (
      // !(await eslint.isPathIgnored(file)) &&
      ['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(file))
    )
  })
  .join(' ')

// console.log(filesToLint)

const { code, stderr, stdout } = shell.exec(`eslint ${filesToLint}`)

if (code !== 0) {
  shell.echo(stderr)
  shell.exit(1)
} else {
  console.log(stdout)
}
