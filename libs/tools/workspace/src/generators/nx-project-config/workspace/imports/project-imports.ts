import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { joinPathFragments, visitNotIgnoredFiles } from '@nx/devkit'

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
export const getProjectImports = (
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
 * Update imports in all project files
 */
export const updateProjectImports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
  transformFn: (importPath: string) => string,
): void => {
  const sourceRoot =
    projectConfig.sourceRoot || joinPathFragments(projectConfig.root, 'src')

  if (!tree.exists(sourceRoot)) {
    return
  }

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

    let updatedContent = content

    // Apply all regex patterns to find and replace imports
    for (const pattern of IMPORT_PATTERNS) {
      // Create a new RegExp instance to reset lastIndex
      const regex = new RegExp(pattern)

      // Replace imports with transformed versions
      updatedContent = updatedContent.replace(regex, (match, importPath) => {
        if (!importPath) {
          return match
        }

        const transformedPath = transformFn(importPath)

        // Replace the import path in the original match
        return match.replace(importPath, transformedPath)
      })
    }

    // Only write the file if changes were made
    tree.write(filePath, updatedContent)
  })
}
