# Package.json Management Tools

This set of tools helps manage `package.json` files in a monorepo project, ensuring consistency in dependency declarations, formatting, and structure.

## Features

- **Library Analysis**: Scan the project to identify libraries and their structure
- **Batch Processing**: Update multiple package.json files at once
- **Dependency Validation**: Check for issues like duplicates, missing dependencies, and format inconsistencies
- **Report Generation**: Create detailed reports of validation results

## Installation

These tools require Node.js 14 or later. No additional installation is necessary as they're included in the repository.

### Dependencies

The tools use the following dependencies:

- commander (for CLI)
- glob (for file pattern matching)
- fs-extra (for enhanced file operations)

## Usage

The main script `manage-package-json.js` provides a command-line interface with several commands:

### Full Process

Run the complete package.json management process:

```bash
node scripts/manage-package-json.js full-process [options]
```

Options:

- `-d, --dry-run`: Run without making changes (default: false)
- `-v, --verbose`: Show detailed logs (default: false)
- `-s, --skip-validation`: Skip validation step (default: false)
- `-p, --project-dir <path>`: Project root directory (default: ".")

This command:

1. Analyzes the project structure to identify libraries
2. Processes all package.json files
3. Validates all dependencies and generates a report if issues are found

### Update Single Package

Update a single package.json file:

```bash
node scripts/manage-package-json.js update-single <file-path> [options]
```

Arguments:

- `<file-path>`: Path to the package.json file to update

Options:

- `-d, --dry-run`: Run without making changes (default: false)
- `-v, --verbose`: Show detailed logs (default: false)

### Validate Dependencies

Validate dependencies across all package.json files:

```bash
node scripts/manage-package-json.js validate [options]
```

Options:

- `-v, --verbose`: Show detailed logs (default: false)
- `-p, --project-dir <path>`: Project root directory (default: ".")

## Individual Tools

The main script orchestrates the following individual tools, which can also be used separately:

### Library Analyzer

Analyzes the project structure to identify libraries:

```bash
node scripts/library-analyzer.js [options]
```

### Batch Process Libraries

Updates all package.json files based on analysis:

```bash
node scripts/batch-process-libraries.js [options]
```

### Validate Dependencies

Validates all dependencies and generates a report:

```bash
node scripts/validate-dependencies.js [options]
```

### Package.json Updater

Updates a single package.json file:

```bash
node scripts/package-json-updater.js <file-path> [options]
```

## Validation Rules

The dependency validator checks for:

1. **Duplicate Dependencies**: The same package appearing in both dependencies and devDependencies
2. **Missing Dependencies**: Internal dependencies used in code but not declared in package.json
3. **Format Consistency**: Ensures workspace dependencies use the "workspace:\*" format
4. **Version Consistency**: Ensures external dependencies use consistent version numbers
5. **Unknown Dependencies**: Identifies dependencies that aren't used in the codebase

## Examples

### Process all package.json files in dry-run mode

```bash
node scripts/manage-package-json.js full-process --dry-run
```

### Update a specific package.json file

```bash
node scripts/manage-package-json.js update-single ./packages/my-package/package.json
```

### Validate dependencies and get a detailed report

```bash
node scripts/manage-package-json.js validate --verbose
```

## Best Practices

1. Always run with `--dry-run` first to preview changes
2. Use `--verbose` when diagnosing issues
3. Review validation reports carefully before making changes
4. Consider running validation as part of CI/CD pipelines

## Troubleshooting

### Common Issues

1. **Tool can't find package.json files**: Ensure you're running from the project root or specify the correct path with `--project-dir`
2. **Changes aren't being applied**: Make sure you're not using `--dry-run`
3. **Validation false positives**: Some edge cases might be flagged incorrectly. Use `--verbose` to get more details.

### Error Handling

If an error occurs, the tools will:

1. Log the error with details
2. Exit with a non-zero code for CI/CD integration
3. Preserve original files in case of failure
