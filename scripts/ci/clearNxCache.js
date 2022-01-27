#!/usr/bin/env node

const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const util = require('util')

// eslint-disable-next-line import/newline-after-import
const getFolderSize = util.promisify(require('get-folder-size'))
const cachePath = path.resolve(process.cwd(), './node_modules/.cache/nx')
const maxCacheMb = 2048

if (fs.existsSync(cachePath)) {
  getFolderSize(cachePath, (err, size) => {
    if (err) {
      throw err
    }

    const MBSize = (size / 1024 / 1024).toFixed(2)

    console.log(`*** NX cache size is ${MBSize} Megabytes`)

    if (MBSize > maxCacheMb) {
      console.log('*** CLEAR NX CACHE ***')
      rimraf.sync(cachePath)
    }
  })
}
