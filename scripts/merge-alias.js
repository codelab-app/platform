const fs = require('fs')
const path = require('path')

// Read the files
const oldAliasPath = path.resolve(
  __dirname,
  '../libs/tools/workspace/src/generators/nx-project-config/workspace/path-alias/old-alias.json',
)
const pathAliasPath = path.resolve(
  __dirname,
  '../libs/tools/workspace/src/generators/nx-project-config/workspace/path-alias/path-alias.json',
)

const oldAlias = require(oldAliasPath)
const pathAlias = require(pathAliasPath)

// Create the new object with updated keys
const result = {}

// Process old-alias.json keys first
Object.keys(oldAlias).forEach((key) => {
  if (pathAlias[key]) {
    // Key already exists in pathAlias
    result[key] = pathAlias[key]
  } else {
    // Key only exists in oldAlias, create a compatible entry
    result[key] = {
      expected: key,
      path: oldAlias[key][0], // Take the first path from the array
      name: null,
    }
  }
})

// Add any new keys from pathAlias that weren't in oldAlias
Object.keys(pathAlias).forEach((key) => {
  if (!result[key]) {
    result[key] = pathAlias[key]
  }
})

// Write the result back
fs.writeFileSync(
  path.resolve(
    __dirname,
    '../libs/tools/workspace/src/generators/nx-project-config/workspace/path-alias/updated-path-alias.json',
  ),
  JSON.stringify(result, null, 2),
)

console.log('Merged files successfully!')
