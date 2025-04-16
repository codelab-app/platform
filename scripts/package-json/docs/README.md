# Package.json Management Tools

This set of tools helps manage `package.json` files in a monorepo project, ensuring consistency in dependency declarations, formatting, and structure.

## Directory Structure

```
scripts/package-json/
├── core/                # Core utilities
│   ├── dependency-classifier.js
│   ├── library-analyzer.js
│   ├── package-json-reader-writer.js
│   └── package-json-updater.js
├── commands/            # Command implementations
│   ├── batch-process-libraries.js
│   └── validate-dependencies.js
├── tests/               # Test scripts
│   ├── run-tests.js     # Main test runner
│   └── ...              # Individual test files
├── docs/                # Documentation
│   └── README.md        # This file
└── index.js             # Main entry point
```

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

The main script provides a command-line interface with several commands:

### Full Process

Run the complete package.json management process:

```bash
pnpm manage-deps full-process [options]
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
pnpm manage-deps update-single <file-path> [options]
```

Arguments:

- `<file-path>`: Path to the package.json file to update

Options:

- `-d, --dry-run`: Run without making changes (default: false)
- `-v, --verbose`: Show detailed logs (default: false)

### Validate Dependencies

Validate dependencies across all package.json files:

```bash
pnpm manage-deps validate [options]
```

Options:

- `-v, --verbose`: Show detailed logs (default: false)
- `-p, --project-dir <path>`: Project root directory (default: ".")

## Development

### Running Tests

To run all tests for the package.json tools:

```bash
node scripts/package-json/tests/run-tests.js
```

### Adding New Features

To add a new feature:

1. Add core utilities to the `core/` directory
2. Implement commands in the `commands/` directory
3. Add test scripts to the `tests/` directory
4. Update the main entry point (`index.js`) to expose the new functionality
5. Update documentation in the `docs/` directory

## Validation Rules

The dependency validator checks for:

1. **Duplicate Dependencies**: The same package appearing in both dependencies and devDependencies
2. **Missing Dependencies**: Internal dependencies used in code but not declared in package.json
3. **Format Consistency**: Ensures workspace dependencies use the "workspace:\*" format
4. **Version Consistency**: Ensures external dependencies use consistent version numbers
5. **Unknown Dependencies**: Identifies dependencies that aren't used in the codebase

## Best Practices

1. Always run with `--dry-run` first to preview changes
2. Use `--verbose` when diagnosing issues
3. Review validation reports carefully before making changes
4. Consider running validation as part of CI/CD pipelines
