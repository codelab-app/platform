import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'

const rootDir = path.resolve(__dirname, '../..')
const tsConfigPath = path.join(rootDir, 'tsconfig.base.json')
const packageJsonPath = path.join(rootDir, 'package.json')

interface TsConfig {
  compilerOptions: {
    paths: Record<string, string[]>
  }
  [key: string]: any
}

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  [key: string]: any
}

/**
 * Convert path alias from @org/module/submodule format to @org/module-submodule format
 */
const convertPathAlias = (alias: string): string => {
  // If the alias doesn't start with @codelab/ or doesn't contain a slash after the organization, return as is
  if (
    !alias.startsWith('@codelab/') ||
    alias.indexOf('/', '@codelab/'.length) === -1
  ) {
    return alias
  }

  // Split the alias into parts
  const parts = alias.split('/')

  // Keep the organization part (@codelab) and join the rest with hyphens
  return `${parts[0]}/${parts.slice(1).join('-')}`
}

/**
 * Generate a mapping from old aliases to new aliases
 */
const generateAliasMapping = (tsConfig: TsConfig): Record<string, string> => {
  const aliasMapping: Record<string, string> = {}

  for (const alias in tsConfig.compilerOptions.paths) {
    const newAlias = convertPathAlias(alias)
    aliasMapping[alias] = newAlias
  }

  return aliasMapping
}

/**
 * Update tsconfig.base.json with new path aliases
 */
const updateTsConfig = (aliasMapping: Record<string, string>): void => {
  console.log('Updating tsconfig.base.json...')

  const tsConfig: TsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'))
  const newPaths: Record<string, string[]> = {}

  for (const oldAlias in tsConfig.compilerOptions.paths) {
    const newAlias = aliasMapping[oldAlias]
    newPaths[newAlias] = tsConfig.compilerOptions.paths[oldAlias]
  }

  tsConfig.compilerOptions.paths = newPaths

  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2), 'utf8')

  console.log('tsconfig.base.json updated successfully.')
}

/**
 * Update import statements in all TypeScript and React files
 */
const updateImports = (aliasMapping: Record<string, string>): void => {
  console.log('Updating import statements in all files...')

  // Create a sorted array of aliases (longer ones first to avoid partial replacements)
  const sortedAliases = Object.keys(aliasMapping).sort(
    (a, b) => b.length - a.length,
  )

  // Get all TypeScript and React files
  const files = glob.sync(path.join(rootDir, '**/*.{ts,tsx,js,jsx}'), {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/scripts/nx/migration-alias.ts',
    ],
  })

  let totalReplacements = 0
  let modifiedFiles = 0

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8')
    let fileModified = false

    for (const oldAlias of sortedAliases) {
      const newAlias = aliasMapping[oldAlias]

      if (oldAlias !== newAlias) {
        // Match static import statements and requires using the old alias
        // from 'package' or require('package')
        const staticImportRegex = new RegExp(
          `(from\\s+['"]|require\\(['"])${oldAlias}(\\/|['"])`,
          'g',
        )

        // Match dynamic import statements using the old alias
        // import('package')
        const dynamicImportRegex = new RegExp(
          `(import\\s*\\(['"])${oldAlias}(\\/|['"])`,
          'g',
        )

        // Replace static imports
        let newContent = content.replace(
          staticImportRegex,
          (match, prefix, suffix) => {
            totalReplacements++
            return `${prefix}${newAlias}${suffix}`
          },
        )

        // Replace dynamic imports
        newContent = newContent.replace(
          dynamicImportRegex,
          (match, prefix, suffix) => {
            totalReplacements++
            return `${prefix}${newAlias}${suffix}`
          },
        )

        if (newContent !== content) {
          content = newContent
          fileModified = true
        }
      }
    }

    if (fileModified) {
      fs.writeFileSync(file, content, 'utf8')
      modifiedFiles++
    }
  }

  console.log(
    `Updated ${totalReplacements} import statements across ${modifiedFiles} files.`,
  )
}

/**
 * Update package.json dependencies if they reference the old aliases
 */
const updatePackageJson = (aliasMapping: Record<string, string>): void => {
  console.log('Checking package.json for dependencies using path aliases...')

  if (!fs.existsSync(packageJsonPath)) {
    console.log('No package.json found, skipping.')
    return
  }

  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf8'),
  )
  let modified = false

  // Update dependencies
  const dependencyTypes = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ] as const

  for (const dependencyType of dependencyTypes) {
    if (!packageJson[dependencyType]) continue

    for (const dependency in packageJson[dependencyType]) {
      // Check if this dependency is one of our path aliases
      const matchingOldAlias = Object.keys(aliasMapping).find(
        (alias) => dependency === alias || dependency.startsWith(`${alias}/`),
      )

      if (matchingOldAlias) {
        const newDependency = dependency.replace(
          matchingOldAlias,
          aliasMapping[matchingOldAlias],
        )

        // Create a new object with updated key
        const value = packageJson[dependencyType]![dependency]
        delete packageJson[dependencyType]![dependency]
        packageJson[dependencyType]![newDependency] = value

        console.log(
          `  Updated ${dependencyType} '${dependency}' -> '${newDependency}'`,
        )
        modified = true
      }
    }
  }

  if (modified) {
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8',
    )
    console.log('package.json updated successfully.')
  } else {
    console.log(
      'No path aliases found in package.json dependencies, no changes needed.',
    )
  }
}

/**
 * Main function to run the migration
 */
const runMigration = async (): Promise<void> => {
  try {
    console.log('Starting path alias migration...')

    // Read tsconfig.base.json
    const tsConfig: TsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'))

    // Generate the mapping from old aliases to new aliases
    const aliasMapping = generateAliasMapping(tsConfig)

    // Output the mapping for verification
    console.log('Alias mapping:')
    for (const [oldAlias, newAlias] of Object.entries(aliasMapping)) {
      if (oldAlias !== newAlias) {
        console.log(`  ${oldAlias} → ${newAlias}`)
      }
    }

    // Confirm before proceeding
    if (process.argv.includes('--dry-run')) {
      console.log('Dry run complete. No files were modified.')
      return
    }

    // Update tsconfig.base.json
    updateTsConfig(aliasMapping)

    // Update import statements in all files
    updateImports(aliasMapping)

    // Update package.json if needed
    updatePackageJson(aliasMapping)

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
runMigration()
