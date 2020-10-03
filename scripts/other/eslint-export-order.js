#!/usr/bin/env node

const glob = require('glob')
const shell = require('shelljs')

/**
 * Run this to apply export-order to only root index for each module
 *
 * `npx babel-node --presets @babel/preset-env --max-old-space-size=8192 scripts/eslint-export-order.js`
 */

const filesToLint =
  // Get all root index
  glob
    .sync('@(apps|libs)/**/src/index.ts', {
      ignore: ['**/node_modules/**', '**/.storybook/**'],
      realpath: true,
    })
    .join(' ')

shell.echo(filesToLint)

const { code, stderr, stdout } = shell.exec(`npx eslint ${filesToLint}`)

if (code !== 0) {
  shell.echo(stderr)
  shell.exit(1)
} else {
  shell.echo(stdout)
}
