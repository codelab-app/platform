#!/usr/bin/env node
const findUp = require('find-up')
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')
const shell = require('shelljs')
const path = require('path')

const { _, fileDirname } = yargs(hideBin(process.argv)).argv

const jestConfigFile = findUp.sync('jest.config.js', { cwd: fileDirname })
const jestConfigJson = require(jestConfigFile)
const nxProject = jestConfigJson.displayName

console.log(nxProject)
