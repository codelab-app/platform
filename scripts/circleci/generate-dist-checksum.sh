#!/bin/bash

# Generate a checksum of all package.json files in dist/libs
# This is used for CircleCI cache invalidation when dist files change

# Change to project root (script is in scripts/circleci/)
cd "$(dirname "$0")/../.." || exit 1

# Create .circleci directory if it doesn't exist
mkdir -p .circleci

# Find all package.json files in dist/libs, sort them for consistency,
# then generate a combined checksum
find dist/libs -name "package.json" -type f 2>/dev/null | \
  sort | \
  xargs -r sha256sum 2>/dev/null | \
  sha256sum | \
  cut -d' ' -f1 > .circleci/dist-libs-checksum.txt

# If no files found, create an empty checksum file
if [ ! -s .circleci/dist-libs-checksum.txt ]; then
  echo "no-dist-libs-found" > .circleci/dist-libs-checksum.txt
fi

echo "Generated checksum: $(cat .circleci/dist-libs-checksum.txt)"