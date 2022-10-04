const fs = require('fs')
const path = require('path')

/**
 * To keep application & libs in their current location, while moving into another git repository, we will need to create a symlink from submodule to target location
 */
const foldersToLink = [
  ['.github', '.github'],
  ['.infra', '.infra'],
  ['.husky', '.husky'],
  ['data', 'data'],
  // Relative paths broken if not on the same level
  ['builder-e2e', 'apps/builder-e2e'],
  ['cli', 'apps/cli'],
]

const projectRoot = path.resolve(__dirname, '../..')
const gitSubModuleRoot = path.resolve(__dirname, '../../.infra')

/**
 * (1) Symlink back to git submodule
 *
 * On CircleCI symlinks are not preserved https://discuss.circleci.com/t/2-0-persist-to-workspace-does-not-preserve-symlinks/14338
 */
foldersToLink
  // Symlink each folder
  .forEach(([submodule, project]) => {
    const existingPath = path.resolve(gitSubModuleRoot, submodule)
    const newPath = path.resolve(projectRoot, project)

    console.log(`[Running]: ln -s ${existingPath} ${newPath}`)

    fs.symlink(existingPath, newPath, () => null)
  })
