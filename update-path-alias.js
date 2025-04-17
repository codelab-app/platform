const fs = require('fs')
const path = require('path')

// Path to the file
const filePath = path.resolve(
  'libs/tools/workspace/src/generators/nx-project-config/workspace/path-alias/path-alias.json',
)

// Read the file
console.log(`Reading file ${filePath}`)
const fileContent = fs.readFileSync(filePath, 'utf8')
const pathAliasData = JSON.parse(fileContent)

// Process all entries
let updateCount = 0
for (const [key, value] of Object.entries(pathAliasData)) {
  if (!key.startsWith('@codelab/') || !value.path || !value.expected) continue

  // Get the path parts
  const pathParts = value.path.split('/')
  const srcIndex = pathParts.indexOf('src')

  if (srcIndex === -1) continue

  // Extract module path (before src) and convert slashes to hyphens
  // For example: libs/backend/application/action → backend-application-action
  const modulePath = pathParts.slice(1, srcIndex).join('-')

  // Extract components from the path (after src, if any)
  const afterSrcPath = pathParts.slice(srcIndex + 1, -1) // Exclude index.ts
  const afterSrcString =
    afterSrcPath.length > 0 ? '/' + afterSrcPath.join('/') : ''

  // Create the new expected value: @codelab/backend-application-action
  const newExpected = `@codelab/${modulePath}${afterSrcString}`

  // Only update if different
  if (value.expected !== newExpected) {
    console.log(`Updating: ${value.expected} → ${newExpected}`)
    value.expected = newExpected
    updateCount++
  }
}

// Write the updated data back to file if changes were made
if (updateCount > 0) {
  fs.writeFileSync(filePath, JSON.stringify(pathAliasData, null, 2), 'utf8')
  console.log(`Updated ${updateCount} entries in path-alias.json`)
} else {
  console.log('No changes were needed.')
}

console.log('Script completed successfully.')
