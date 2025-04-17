import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  getProjects,
  joinPathFragments,
  readJson,
  readProjectConfiguration,
  visitNotIgnoredFiles,
  writeJson,
} from '@nx/devkit'

import {
  getPackageJsonNameFromMapping,
  getPackageJsonNameFromProjectName,
} from './utils'

/**
 * Regex patterns for import statements
 */
const IMPORT_PATTERNS = [
  // ES6 imports: import X from 'package'
  /import\s+(?:[\w\s{},*]+\s+from\s+)?['"](@codelab\/[^'"]+)['"]/g,
  // require imports: require('package')
  /require\s*\(\s*['"](@codelab\/[^'"]+)['"]\s*\)/g,
  // dynamic imports: import('package')
  /import\s*\(\s*['"](@codelab\/[^'"]+)['"]\s*\)/g,
]

/**
 * Extract import statements from file content
 */
const extractImports = (content: string): Array<string> => {
  const imports = new Set<string>()

  // Apply all regex patterns to find imports
  for (const pattern of IMPORT_PATTERNS) {
    // Create a new RegExp instance to reset lastIndex
    const regex = new RegExp(pattern)
    let match

    // Use exec to find all matches in the content
    while ((match = regex.exec(content)) !== null) {
      const importPath = match[1]

      if (importPath) {
        imports.add(importPath)
      }
    }
  }

  return [...imports]
}

/**
 * Get all imports from a project
 */
const getProjectImports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
): Array<string> => {
  const sourceRoot =
    projectConfig.sourceRoot || joinPathFragments(projectConfig.root, 'src')

  if (!tree.exists(sourceRoot)) {
    return []
  }

  const imports = new Set<string>()

  // Use visitNotIgnoredFiles to traverse the directory structure efficiently
  visitNotIgnoredFiles(tree, sourceRoot, (filePath) => {
    // Only process TypeScript/JavaScript files
    if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) {
      return
    }

    // Read file content
    const content = tree.read(filePath, 'utf-8')

    if (!content) {
      return
    }

    // Extract imports
    const fileImports = extractImports(content)

    for (const importPath of fileImports) {
      imports.add(importPath)
    }
  })

  return [...imports]
}

/**
 * Updates the app to include dependencies to libraries
 */
export const updatePackageDependencies = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Updating app dependencies')

  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  if (!tree.exists(packageJsonPath)) {
    console.log('No package.json found')

    return
  }

  if (!projectConfig.name) {
    throw new Error('Project name is required')
  }

  console.log(`Analyzing and updating dependencies in ${packageJsonPath}`)

  const packageJson = readJson(tree, packageJsonPath)
  // Here we want to read each file in this library
  const imports = getProjectImports(tree, projectConfig)

  console.log(
    `Found ${imports.length} @codelab imports in ${projectConfig.name}`,
  )
  console.log('Imports:', JSON.stringify(imports, null, 2))

  // Ensure devDependencies exists
  packageJson.devDependencies = packageJson.devDependencies || {}

  writeJson(tree, packageJsonPath, packageJson)
  console.log(`Updated dependencies in ${packageJsonPath}`)
}
