#!/bin/bash

# update_imports.sh
#
# Description:
#   This script updates import statements that use incorrect path format
#   from: @codelab/frontend-application-module-use-cases-subpath
#   to:   @codelab/frontend-application-module/use-cases/subpath
#
#   It also updates domain model repositories imports:
#   from: @codelab/frontend-domain-model-repositories
#   to:   @codelab/frontend-domain-model/repositories
#
# Usage:
#   ./scripts/update_imports.sh [OPTIONS] [DIRECTORY]
#
# Options:
#   -h, --help     Display this help message and exit
#   -d, --dry-run  Show what would be changed without making modifications
#
# Arguments:
#   DIRECTORY  The directory to search for import statements (default: apps/web)
#
# Examples:
#   ./scripts/update_imports.sh                # Process apps/web directory
#   ./scripts/update_imports.sh --dry-run      # Show changes without modifying files
#   ./scripts/update_imports.sh libs           # Process libs directory

set -e

# Default values
TARGET_DIR="apps/web"
DRY_RUN=false

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
    *)
      TARGET_DIR="$1"
      shift
      ;;
  esac
done

echo "Searching for incorrect import patterns in $TARGET_DIR..."

# Find all TypeScript and TSX files
TS_FILES=$(find "$TARGET_DIR" -name "*.ts" -o -name "*.tsx")

if [[ -z "$TS_FILES" ]]; then
  echo "No TypeScript files found in $TARGET_DIR"
  exit 0
fi

# Function to update import statements in a file
update_imports() {
  local file="$1"
  local updated=false
  local temp_file=$(mktemp)

  # Check if the file contains the application pattern or domain-model-repositories pattern
  if grep -q '@codelab/frontend-application-[a-z]\+-use-cases-[a-z-]\+\|@codelab/frontend-domain-[a-z]\+-repositories' "$file"; then
    echo "Processing $file"

    if [[ "$DRY_RUN" == "true" ]]; then
      # Show what would be changed
      echo "Would update these imports in $file:"

      # Application pattern
      grep -o '@codelab/frontend-application-[a-z]\+-use-cases-[a-z-]\+' "$file" 2>/dev/null | while read -r match; do
        module=$(echo "$match" | sed -E 's/@codelab\/frontend-application-([a-z]+)-use-cases-.*/\1/')
        subpath=$(echo "$match" | sed -E 's/@codelab\/frontend-application-[a-z]+-use-cases-([a-z-]+)/\1/')
        echo "  $match -> @codelab/frontend-application-$module/use-cases/$subpath"
      done

      # Domain-model-repositories pattern
      grep -o '@codelab/frontend-domain-[a-z-]\+-repositories' "$file" 2>/dev/null | while read -r match; do
        model=$(echo "$match" | sed -E 's/@codelab\/frontend-domain-([a-z-]+)-repositories/\1/')
        echo "  $match -> @codelab/frontend-domain-$model/repositories"
      done
    else
      # Actually update the file
      # First update application pattern
      sed -E 's/@codelab\/frontend-application-([a-z]+)-use-cases-([a-z-]+)/@codelab\/frontend-application-\1\/use-cases\/\2/g' "$file" > "$temp_file"

      # Then update domain-model-repositories pattern
      sed -i.bak -E 's/@codelab\/frontend-domain-([a-z-]+)-repositories/@codelab\/frontend-domain-\1\/repositories/g' "$temp_file"
      rm -f "$temp_file.bak"

      # Check if the file was changed
      if ! diff -q "$file" "$temp_file" > /dev/null; then
        updated=true
        mv "$temp_file" "$file"
        echo "  Updated imports in $file"
      else
        rm "$temp_file"
        echo "  No changes needed in $file"
      fi
    fi
  fi
}

# Process each TypeScript file
for file in $TS_FILES; do
  update_imports "$file"
done

echo "Finished processing files in $TARGET_DIR"

if [[ "$DRY_RUN" == "true" ]]; then
  echo "This was a dry run, no files were modified."
fi
