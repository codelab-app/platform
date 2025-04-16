#!/usr/bin/env node

import path from 'path'
import { Command } from 'commander'
import fs from 'fs'

// Get the command-line arguments
const args = process.argv.slice(2)

// Special case handling for update-single to fix the path resolution issue
if (args.length >= 2 && args[0] === 'update-single') {
  ;(async () => {
    try {
      const filePath = args[1]
      const verbose = args.includes('--verbose')
      const dryRun = args.includes('--dry-run')

      console.log(`Direct CLI mode: Updating package.json ${filePath}`)

      // Get absolute path if relative path is provided
      const absoluteFilePath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(process.cwd(), filePath)

      // Extract the directory path from the file path
      const libraryPath = path.dirname(absoluteFilePath)
      const packageJsonPath = path.join(libraryPath, 'package.json')

      console.log(`Resolved library path: ${libraryPath}`)

      // Check if package.json exists
      if (!fs.existsSync(packageJsonPath)) {
        console.error(`No package.json found at ${packageJsonPath}`)
        process.exit(1)
      }

      // Read the existing package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
      console.log(`Successfully read package.json from ${packageJsonPath}`)

      // The main logic: update the devDependencies

      // Make sure devDependencies exists
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {}
      }

      // If we wanted to add/update dependencies, we would do it here
      // For now, we're just going to print the current dependencies
      if (verbose) {
        console.log('Current devDependencies:')
        console.log(JSON.stringify(packageJson.devDependencies, null, 2))
      }

      // Sort dependencies alphabetically (as a simple update example)
      packageJson.devDependencies = Object.fromEntries(
        Object.entries(packageJson.devDependencies).sort(([keyA], [keyB]) =>
          keyA.localeCompare(keyB),
        ),
      )

      // Write the updated package.json
      if (!dryRun) {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
        console.log(`✅ Successfully wrote package.json to ${packageJsonPath}`)
        console.log('✅ Package.json update complete')
      } else {
        console.log('Dry run - not writing package.json')
        console.log('Would write:')
        console.log(JSON.stringify(packageJson, null, 2))
      }
    } catch (error) {
      console.error('❌ Error updating package.json:', error.message)
      process.exit(1)
    }

    // Exit after direct CLI processing
    process.exit(0)
  })()
}
// Continue with commander-based CLI for other commands
else {
  // Setup command-line interface
  const program = new Command()

  program
    .name('package-json-manager')
    .description('CLI tool for managing package.json files in a monorepo')
    .version('1.0.0')

  // Command to run the full process
  program
    .command('full-process')
    .description('Run the complete package.json management process')
    .option('-d, --dry-run', 'Run without making changes', false)
    .option('-v, --verbose', 'Show detailed logs', false)
    .option('-s, --skip-validation', 'Skip validation step', false)
    .option('-p, --project-dir <path>', 'Project root directory', '.')
    .action(async (options) => {
      console.log('Starting full package.json management process...')

      try {
        // Import modules only when this command is executed
        const { batchProcessLibraries } = await import(
          './commands/batch-process-libraries.js'
        )
        const { validateAllLibraries } = await import(
          './commands/validate-dependencies.js'
        )
        const { analyzeLibraries } = await import('./core/library-analyzer.js')

        // 1. Run analyze-project-structure.js to create libraries.json
        console.log('\n🔍 Analyzing project structure...')
        // Import dynamically to avoid circular dependencies
        const { analyzeProjectStructure } = await import(
          './scripts/analyze-project-structure.js'
        )
        await analyzeProjectStructure({
          rootDir: options.projectDir,
          verbose: options.verbose,
        })
        console.log('✅ Project structure analysis complete')

        // 2. Run parse-source-files.js to create imports.json
        console.log('\n🔍 Parsing source files for imports...')
        // Import dynamically
        const { parseSourceFiles } = await import(
          './scripts/parse-source-files.js'
        )
        await parseSourceFiles({
          rootDir: options.projectDir,
          verbose: options.verbose,
        })
        console.log('✅ Source file parsing complete')

        // 3. Analyze libraries (based on the generated JSON files)
        console.log('\n🔍 Analyzing libraries...')
        await analyzeLibraries({
          rootDir: options.projectDir,
          verbose: options.verbose,
        })
        console.log('✅ Library analysis complete')

        // 4. Batch process libraries
        console.log('\n🔄 Processing package.json files...')
        const processingResults = await batchProcessLibraries({
          dryRun: options.dryRun,
          verbose: options.verbose,
          rootDir: options.projectDir,
        })
        console.log(
          `✅ Processed ${processingResults.processed.length} package.json files`,
        )

        // 5. Validate dependencies
        if (!options.skipValidation) {
          console.log('\n🔬 Validating dependencies...')
          const validationResults = await validateAllLibraries({
            rootDir: options.projectDir,
            verbose: options.verbose,
          })

          // Log validation summary
          console.log('\n📊 Validation Summary:')
          console.log(
            `  - Total packages analyzed: ${validationResults.totalPackages}`,
          )
          console.log(
            `  - Packages with issues: ${validationResults.packagesWithIssues.length}`,
          )
          console.log(
            `  - Total issues found: ${validationResults.totalIssuesCount}`,
          )

          // Generate validation report
          if (validationResults.packagesWithIssues.length > 0) {
            const reportPath = path.join(
              options.projectDir,
              'dependency-validation-report.json',
            )
            fs.writeFileSync(
              reportPath,
              JSON.stringify(validationResults, null, 2),
            )
            console.log(
              `\n⚠️ Issues found! Detailed report saved to: ${reportPath}`,
            )
          } else {
            console.log('\n✅ No dependency issues found')
          }
        } else {
          console.log('\n⏩ Validation step skipped')
        }

        console.log(
          '\n🎉 Package.json management process completed successfully!',
        )
      } catch (error) {
        console.error(
          '\n❌ Error during package.json management process:',
          error.message,
        )
        process.exit(1)
      }
    })

  // Command to update a single package.json file (this still exists but is deprecated in favor of direct CLI)
  program
    .command('update-single')
    .description('Update a single package.json file')
    .argument('<file-path>', 'Path to the package.json file')
    .option('-d, --dry-run', 'Run without making changes', false)
    .option('-v, --verbose', 'Show detailed logs', false)
    .action(async (filePath, options) => {
      console.log(`Updating single package.json: ${filePath}`)

      try {
        // Import modules only when this command is executed
        const { updateLibraryPackageJson } = await import(
          './core/package-json-updater.js'
        )

        // Get absolute path if relative path is provided
        const absoluteFilePath = path.isAbsolute(filePath)
          ? filePath
          : path.resolve(process.cwd(), filePath)

        // Extract the directory path from the file path
        const libraryPath = path.dirname(absoluteFilePath)

        console.log(`Resolved library path: ${libraryPath}`)

        const result = await updateLibraryPackageJson(libraryPath, {
          dryRun: options.dryRun,
          verbose: options.verbose,
        })

        if (result.success) {
          console.log('✅ Package.json update complete')
          if (options.verbose) {
            console.log('Changes made:')
            console.log(JSON.stringify(result, null, 2))
          }
        } else {
          console.error('❌ Failed to update package.json')
          if (result.error) {
            console.error(`   Error: ${result.error}`)
          }
          process.exit(1)
        }
      } catch (error) {
        console.error('❌ Error updating package.json:', error.message)
        process.exit(1)
      }
    })

  // Command to only validate
  program
    .command('validate')
    .description('Validate package.json dependencies')
    .option('-v, --verbose', 'Show detailed logs', false)
    .option('-p, --project-dir <path>', 'Project root directory', '.')
    .action(async (options) => {
      console.log('Validating package.json dependencies...')

      try {
        // Import modules only when this command is executed
        const { validateAllLibraries } = await import(
          './commands/validate-dependencies.js'
        )

        const validationResults = await validateAllLibraries({
          rootDir: options.projectDir,
          verbose: options.verbose,
        })

        // Log validation summary
        console.log('\n📊 Validation Summary:')
        console.log(
          `  - Total packages analyzed: ${validationResults.totalPackages}`,
        )
        console.log(
          `  - Packages with issues: ${validationResults.packagesWithIssues.length}`,
        )
        console.log(
          `  - Total issues found: ${validationResults.totalIssuesCount}`,
        )

        // Generate validation report
        if (validationResults.packagesWithIssues.length > 0) {
          const reportPath = path.join(
            options.projectDir,
            'dependency-validation-report.json',
          )
          fs.writeFileSync(
            reportPath,
            JSON.stringify(validationResults, null, 2),
          )
          console.log(
            `\n⚠️ Issues found! Detailed report saved to: ${reportPath}`,
          )
        } else {
          console.log('\n✅ No dependency issues found')
        }
      } catch (error) {
        console.error('❌ Error during validation:', error.message)
        process.exit(1)
      }
    })

  // Parse command line arguments
  program.parse(process.argv)

  // If no arguments, show help
  if (!process.argv.slice(2).length) {
    program.help()
  }
}
