import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { joinPathFragments, visitNotIgnoredFiles } from '@nx/devkit'
import pathAliasMap from '../path-alias/path-alias.json'
import { parseImports } from './parse-imports'

/**
 * Get all imports from a project
 */
export const getProjectImports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
): string[] => {
  const allImports: string[] = []
  const sourceRoot =
    projectConfig.sourceRoot || joinPathFragments(projectConfig.root, 'src')

  if (!tree.exists(sourceRoot)) {
    console.log(`Source root ${sourceRoot} does not exist`)
    return allImports
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

    // Parse imports from the file using AST
    const imports = parseImports(content, filePath)
    
    // Collect imports that are in the path alias map
    imports.forEach(importPath => {
      if (importPath in pathAliasMap) {
        allImports.push(importPath)
      }
    })
  })

  // Return unique imports
  return [...new Set(allImports)]
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
    console.log(`Source root ${sourceRoot} does not exist`)
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

    // Parse imports from the file using AST
    const imports = parseImports(content, filePath)
    
    // Check if any imports need to be transformed
    const transformations: Record<string, string> = {}
    imports.forEach(importPath => {
      if (importPath in pathAliasMap) {
        const newPath = transformFn(importPath)
        if (newPath !== importPath) {
          transformations[importPath] = newPath
        }
      }
    })

    // If no transformations needed, skip this file
    if (Object.keys(transformations).length === 0) {
      return
    }

    // Apply transformations using simple string replacement
    let updatedContent = content
    Object.entries(transformations).forEach(([oldPath, newPath]) => {
      // Replace all occurrences of the old path with the new path
      // This works because import paths are always in quotes
      const searchStrings = [
        `'${oldPath}'`,
        `"${oldPath}"`,
      ]
      
      searchStrings.forEach(searchString => {
        const replacement = searchString.replace(oldPath, newPath)
        if (updatedContent.includes(searchString)) {
          updatedContent = updatedContent.replaceAll(searchString, replacement)
          console.log(
            `File: ${filePath} -> Replaced "${oldPath}" with "${newPath}"`,
          )
        }
      })
    })

    // Write the updated content
    console.log(`Updating ${filePath} with new import paths.`)
    tree.write(filePath, updatedContent)
  })
}
