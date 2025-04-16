#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const rootDir = process.cwd()

// Run grep to find all files with the pattern
const grepResult = execSync(
  'grep -r "@codelab/frontend-presentation-view-" --include="*.tsx" --include="*.ts" .',
  { cwd: rootDir },
).toString()

// Parse the grep results to get file paths
const filesToModify = new Set()
grepResult.split('\n').forEach((line) => {
  if (line.trim() === '') return
  const filePath = line.split(':')[0]
  if (filePath) {
    filesToModify.add(filePath)
  }
})

console.log(`Found ${filesToModify.size} files to update`)

// Process each file
filesToModify.forEach((filePath) => {
  try {
    const fullPath = path.join(rootDir, filePath)
    let content = fs.readFileSync(fullPath, 'utf8')

    // Replace the import patterns
    const newContent = content.replace(
      /@codelab\/frontend-presentation-view-([a-z-]+)(?:-([a-z-]+))?/g,
      (match, p1, p2) => {
        if (p2) {
          return `@codelab/frontend-presentation-view/${p1}/${p2}`
        }
        return `@codelab/frontend-presentation-view/${p1}`
      },
    )

    if (content !== newContent) {
      fs.writeFileSync(fullPath, newContent)
      console.log(`Updated: ${filePath}`)
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
  }
})

console.log('All imports updated successfully')
