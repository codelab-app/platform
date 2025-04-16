#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

/**
 * Script to analyze the project structure and identify all libraries
 * under Front End Application and Front End Domain folders
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Root paths for frontend application and domain directories
const FRONTEND_APPLICATION_PATH = 'libs/frontend/application'
const FRONTEND_DOMAIN_PATH = 'libs/frontend/domain'
const OUTPUT_FILE = path.join(__dirname, 'libraries.json')

/**
 * Get all subdirectories in a directory
 */
const getDirectories = (source) => {
  try {
    return fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => path.join(source, dirent.name))
  } catch (error) {
    console.error(`Error reading directory ${source}:`, error)
    return []
  }
}

/**
 * Check if a directory is a library (has a src folder or package.json)
 */
const isLibrary = (directoryPath) => {
  try {
    // Check if it has a src folder
    const srcPath = path.join(directoryPath, 'src')
    if (fs.existsSync(srcPath) && fs.lstatSync(srcPath).isDirectory()) {
      return true
    }

    // Check if it has a package.json
    const packageJsonPath = path.join(directoryPath, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      return true
    }

    return false
  } catch (error) {
    console.error(`Error checking if ${directoryPath} is a library:`, error)
    return false
  }
}

/**
 * Identify all libraries in a root path
 */
const identifyLibraries = (rootPath) => {
  if (!fs.existsSync(rootPath)) {
    console.warn(`Warning: Path ${rootPath} does not exist.`)
    return []
  }

  const libraries = []
  const directories = getDirectories(rootPath)

  for (const directory of directories) {
    if (isLibrary(directory)) {
      libraries.push(directory)
    }
  }

  return libraries
}

// Main execution
const main = () => {
  try {
    // Finding frontend application libraries
    console.log(`Scanning ${FRONTEND_APPLICATION_PATH} for libraries...`)
    const applicationLibraries = identifyLibraries(FRONTEND_APPLICATION_PATH)
    console.log(
      `Found ${applicationLibraries.length} libraries in frontend application`,
    )

    // Finding frontend domain libraries
    console.log(`Scanning ${FRONTEND_DOMAIN_PATH} for libraries...`)
    const domainLibraries = identifyLibraries(FRONTEND_DOMAIN_PATH)
    console.log(`Found ${domainLibraries.length} libraries in frontend domain`)

    // Combine all libraries
    const allLibraries = {
      application: applicationLibraries,
      domain: domainLibraries,
    }

    // Write the result to a JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allLibraries, null, 2))
    console.log(`Library paths written to ${OUTPUT_FILE}`)

    return allLibraries
  } catch (error) {
    console.error('Error analyzing project structure:', error)
    process.exit(1)
  }
}

// Execute the script
main()
