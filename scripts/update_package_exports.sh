#!/bin/bash

# update_package_exports.sh
#
# Description:
#   This script automatically updates package.json files to export top-level src directories.
#   It finds all package.json files recursively within a specified directory and updates
#   the 'exports' field to include all top-level directories within src, preserving
#   existing exports configurations.
#   For application folders, use-cases directories have their subdirectories exported as well.
#
# Usage:
#   ./update_package_exports.sh [OPTIONS] [TARGET_DIRECTORY]
#
# Options:
#   -h, --help     Display this help message and exit
#   -d, --dry-run  Show what would be changed without making modifications
#   -q, --quiet    Silence non-essential output
#
# Arguments:
#   TARGET_DIRECTORY  Directory to search for package.json files (default: libs/frontend/domain)
#
# Examples:
#   ./update_package_exports.sh                         # Process libs/frontend/domain
#   ./update_package_exports.sh libs/frontend/application   # Process specific directory
#   ./update_package_exports.sh -d libs/shared          # Dry-run for libs/shared
#
# Author: Cursor AI Assistant

set -e

# Default values
TARGET_DIR="libs/frontend/domain"
DRY_RUN=false
QUIET=false

# Process options and arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      grep "^#" "$0" | grep -v "#!/bin/bash" | sed 's/^# \?//'
      exit 0
      ;;
    -d|--dry-run)
      DRY_RUN=true
      shift
      ;;
    -q|--quiet)
      QUIET=true
      shift
      ;;
    *)
      TARGET_DIR="$1"
      shift
      ;;
  esac
done

# Log function
log() {
  if [[ "$QUIET" == "false" ]]; then
    echo "$1"
  fi
}

# Error function
error() {
  echo "ERROR: $1" >&2
  exit 1
}

# Check if directory exists
if [[ ! -d "$TARGET_DIR" ]]; then
  error "Directory '$TARGET_DIR' does not exist"
fi

log "Searching for package.json files in $TARGET_DIR..."

# Find all package.json files
PACKAGE_FILES=$(find "$TARGET_DIR" -name "package.json" -type f)

if [[ -z "$PACKAGE_FILES" ]]; then
  log "No package.json files found in $TARGET_DIR"
  exit 0
fi

# Process each package.json file
for PACKAGE_FILE in $PACKAGE_FILES; do
  log "Processing $PACKAGE_FILE"

  # Check if the package.json file is readable
  if [[ ! -r "$PACKAGE_FILE" ]]; then
    error "Cannot read $PACKAGE_FILE (permission denied)"
  fi

  # Get the directory containing package.json
  PACKAGE_DIR=$(dirname "$PACKAGE_FILE")

  # Check if src directory exists
  if [[ ! -d "$PACKAGE_DIR/src" ]]; then
    log "No src directory found in $PACKAGE_DIR, skipping"
    continue
  fi

  # Find all top-level directories in src
  SRC_DIRS=$(find "$PACKAGE_DIR/src" -mindepth 1 -maxdepth 1 -type d -not -path "*/\.*" | sort)

  if [[ -z "$SRC_DIRS" ]]; then
    log "No subdirectories found in $PACKAGE_DIR/src, skipping"
    continue
  fi

  # Temporary file for the updated package.json
  TEMP_FILE=$(mktemp)

  # Check if we're in the application folder
  IS_APPLICATION_FOLDER=false
  if [[ "$PACKAGE_DIR" == *"application"* ]]; then
    IS_APPLICATION_FOLDER=true
    log "Detected application folder, will export additional levels for use-cases"
  fi

  if [[ "$DRY_RUN" == "true" ]]; then
    log "DRY RUN: Would update the following directories in $PACKAGE_FILE exports:"
    for DIR in $SRC_DIRS; do
      DIR_NAME=$(basename "$DIR")
      log "  - ./$DIR_NAME"

      # For application folders, show use-cases subdirectories that would be exported
      if [[ "$IS_APPLICATION_FOLDER" == "true" && "$DIR_NAME" == "use-cases" ]]; then
        USECASE_SUBDIRS=$(find "$DIR" -mindepth 1 -maxdepth 1 -type d -not -path "*/\.*" | sort)
        for USECASE_DIR in $USECASE_SUBDIRS; do
          USECASE_NAME=$(basename "$USECASE_DIR")
          log "    - ./$DIR_NAME/$USECASE_NAME"
        done
      fi
    done
    continue
  fi

  # Check if jq is installed
  if ! command -v jq &> /dev/null; then
    error "jq is required but not installed. Please install jq to continue."
  fi

  # Start building the exports object with the default entry
  EXPORTS_OBJ='{".": {"default": "./src/index.ts", "import": "./src/index.ts", "types": "./src/index.ts"}}'

  # Add entries for each top-level directory in src
  for DIR in $SRC_DIRS; do
    DIR_NAME=$(basename "$DIR")

    # Skip if the directory is named 'index' as it's already covered by the default export
    if [[ "$DIR_NAME" == "index" ]]; then
      continue
    fi

    # Add export for this directory without "./src" in the key
    EXPORTS_OBJ=$(echo "$EXPORTS_OBJ" | jq --arg dir "$DIR_NAME" '. + {".\/\($dir)": {"default": "./src/\($dir)/index.ts", "import": "./src/\($dir)/index.ts", "types": "./src/\($dir)/index.ts"}}')

    # For application folders, export use-cases subdirectories
    if [[ "$IS_APPLICATION_FOLDER" == "true" && "$DIR_NAME" == "use-cases" ]]; then
      USECASE_SUBDIRS=$(find "$DIR" -mindepth 1 -maxdepth 1 -type d -not -path "*/\.*" | sort)
      for USECASE_DIR in $USECASE_SUBDIRS; do
        USECASE_NAME=$(basename "$USECASE_DIR")
        # Add export for this use-case subdirectory without "./src" in the key
        EXPORTS_OBJ=$(echo "$EXPORTS_OBJ" | jq --arg dir "$DIR_NAME" --arg sub "$USECASE_NAME" '. + {".\/\($dir)\/\($sub)": {"default": "./src/\($dir)/\($sub)/index.ts", "import": "./src/\($dir)/\($sub)/index.ts", "types": "./src/\($dir)/\($sub)/index.ts"}}')
      done
    fi
  done

  # Update the package.json file, preserving existing structure
  if ! jq --argjson exports "$EXPORTS_OBJ" '.exports = $exports' "$PACKAGE_FILE" > "$TEMP_FILE"; then
    rm "$TEMP_FILE"
    error "Failed to update $PACKAGE_FILE (jq error)"
  fi

  # Check if the temporary file is valid JSON
  if ! jq empty "$TEMP_FILE" 2>/dev/null; then
    rm "$TEMP_FILE"
    error "Generated invalid JSON for $PACKAGE_FILE"
  fi

  # Write back to the original file
  if ! mv "$TEMP_FILE" "$PACKAGE_FILE"; then
    rm "$TEMP_FILE"
    error "Failed to update $PACKAGE_FILE (write error)"
  fi

  log "Successfully updated exports in $PACKAGE_FILE"
done

log "Finished processing package.json files in $TARGET_DIR"
exit 0
