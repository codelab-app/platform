import type { Tree } from '@nx/devkit'
import { visitNotIgnoredFiles } from '@nx/devkit'
import { parseImports } from './parse-imports'

/**
 * Update all imports from all files in a directory
 */
export const updateProjectImports = (
  tree: Tree,
  sourceRoot: string
): Record<string, string[]> => {
  const fileImports: Record<string, string[]> = {}

  if (!tree.exists(sourceRoot)) {
    return fileImports
  }

  // Use visitNotIgnoredFiles to traverse the directory structure efficiently
  visitNotIgnoredFiles(tree, sourceRoot, (filePath) => {
    // Only process TypeScript/JavaScript files
    if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) {
      return
    }

    // Read file content
    const content = tree.read(filePath, 'utf-8')
    if (content) {
      const imports = parseImports(content, filePath)
      if (imports.length > 0) {
        fileImports[filePath] = imports
      }
    }
  })
  
  return fileImports
}