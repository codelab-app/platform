const fs = require('fs')
const path = require('path')

/**
 * To keep application & libs in their current location, while moving into another git repository, we will need to create a symlink from submodule to target location
 */
const foldersToLink = ['apps/builder-e2e', 'apps/cli']
const projectRoot = path.resolve(__dirname, '../..')
const gitSubModuleRoot = path.resolve(__dirname, '../../.infra')

/**
 * (1) Symlink back to git submodule
 */
foldersToLink
  // Symlink each folder
  .forEach(([oldApp, newApp]) => {
    const existingPath = path.resolve(gitSubModuleRoot, oldApp)
    const newPath = path.resolve(projectRoot, newApp)

    fs.symlink(existingPath, newPath, 'dir')
  })
