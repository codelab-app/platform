#!/usr/bin/env node

const shell = require('shelljs')
const { env } = require('../env-config')

shell.exec(`yarn cli dgraph update-schema --env ${env}`)
