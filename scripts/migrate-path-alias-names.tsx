import * as fs from 'fs'
import * as path from 'path'

const aliasFilePath = path.resolve(
  __dirname,
  '../libs/tools/workspace/src/generators/nx-project-config/workspace/path-alias/path-alias.json',
)

interface AliasConfig {
  expected: string
  path: string
  name: string | null
}

interface AliasMap {
  [alias: string]: AliasConfig
}

const migrateAliasNames = () => {
  try {
    const fileContent = fs.readFileSync(aliasFilePath, 'utf-8')
    const aliases: AliasMap = JSON.parse(fileContent)

    let changesMade = 0

    for (const alias in aliases) {
      if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
        const config = aliases[alias]

        if (!config) {
          console.warn(
            `Warning: Alias "${alias}" has no configuration. Skipping.`,
          )
          continue
        }

        const filePath = config.path
        const srcIndex = filePath.indexOf('/src/')

        if (srcIndex !== -1) {
          const pathAfterSrc = filePath.substring(srcIndex + '/src/'.length)

          if (pathAfterSrc !== 'index.ts') {
            if (config.name !== null) {
              console.log(
                `Updating alias "${alias}": Setting name to null (Path: ${filePath})`,
              )
              config.name = null
              changesMade++
            }
          } else {
            // Ensure name is present if path IS src/index.ts
            // This part might need adjustment based on how 'name' was originally derived
            // For now, we assume if it's src/index.ts, the name should exist and remain unchanged.
            // If it was null previously, this logic doesn't automatically fix it,
            // as the original rule was only about setting to null.
            // console.log(`Alias "${alias}" points to src/index.ts, keeping name: ${config.name}`);
          }
        }
      }
    }

    if (changesMade > 0) {
      const updatedJson = JSON.stringify(aliases, null, 2)
      fs.writeFileSync(aliasFilePath, updatedJson, 'utf-8')
      console.log(
        `Successfully migrated ${changesMade} alias names in ${aliasFilePath}`,
      )
    } else {
      console.log('\nNo changes needed for alias names.')
    }
  } catch (error) {
    console.error('Error during alias migration:', error)
    process.exit(1)
  }
}

migrateAliasNames()
