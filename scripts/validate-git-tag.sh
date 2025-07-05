#!/bin/bash

# Validate git tags for semantic versioning
# Usage: ./validate-git-tag.sh <current_version> <new_version>
#    or: ./validate-git-tag.sh --validate-only <version>

set -e

# Check if running in validate-only mode
if [ "$1" = "--validate-only" ]; then
    VERSION=$2
    if [ -z "$VERSION" ]; then
        echo "Error: Version must be provided"
        echo "Usage: $0 --validate-only <version>"
        exit 1
    fi
    
    # Validate version format using semver
    node -e "
    const semver = require('semver');
    if (!semver.valid('$VERSION')) {
        process.exit(1);
    }
    " 2>/dev/null
    exit $?
fi

CURRENT_VERSION=$1
NEW_VERSION=$2

# Check if both arguments are provided
if [ -z "$CURRENT_VERSION" ] || [ -z "$NEW_VERSION" ]; then
    echo "Error: Both current and new version must be provided"
    echo "Usage: $0 <current_version> <new_version>"
    echo "   or: $0 --validate-only <version>"
    exit 1
fi

# Use Node.js with inline script to validate versions
node -e "
const semver = require('semver');

const currentVersion = '$CURRENT_VERSION';
const newVersion = '$NEW_VERSION';

// Validate both versions are valid semver
if (!semver.valid(currentVersion)) {
    console.error(\`Error: Current version '\${currentVersion}' is not a valid semantic version\`);
    process.exit(1);
}

if (!semver.valid(newVersion)) {
    console.error(\`Error: New version '\${newVersion}' is not a valid semantic version\`);
    process.exit(1);
}

// Ensure new version is greater than current
if (!semver.gt(newVersion, currentVersion)) {
    console.error(\`Error: New version '\${newVersion}' must be greater than current version '\${currentVersion}'\`);
    process.exit(1);
}

// Parse versions to check increment rules
const current = semver.parse(currentVersion);
const next = semver.parse(newVersion);

// Check patch increment rules
if (next.major === current.major && next.minor === current.minor) {
    // This is a patch increment
    const expectedPatch = current.patch + 1;
    if (next.patch !== expectedPatch) {
        console.error(\`Error: Patch version must increment by exactly 1\`);
        console.error(\`Expected: \${current.major}.\${current.minor}.\${expectedPatch}\`);
        console.error(\`Got: \${newVersion}\`);
        process.exit(1);
    }
}

// Check minor increment rules
if (next.major === current.major && next.minor > current.minor) {
    // This is a minor increment - patch must be 0
    if (next.patch !== 0) {
        console.error(\`Error: When incrementing minor version, patch must be reset to 0\`);
        console.error(\`Expected: \${current.major}.\${next.minor}.0\`);
        console.error(\`Got: \${newVersion}\`);
        process.exit(1);
    }
}

// Check major increment rules
if (next.major > current.major) {
    // This is a major increment - minor and patch must be 0
    if (next.minor !== 0 || next.patch !== 0) {
        console.error(\`Error: When incrementing major version, minor and patch must be reset to 0\`);
        console.error(\`Expected: \${next.major}.0.0\`);
        console.error(\`Got: \${newVersion}\`);
        process.exit(1);
    }
}

// All validations passed
console.log(\`✓ Version increment from \${currentVersion} to \${newVersion} is valid\`);
"