#!/bin/bash
set -e

# Script to get the latest snapshot ID for a given image name pattern
# Usage: ./get-latest-snapshot.sh <image-name-pattern>

PATTERN="$1"

if [ -z "$PATTERN" ]; then
  echo "Error: Image name pattern required"
  echo "Usage: $0 <image-name-pattern>"
  echo "Example: $0 codelab-services-base"
  exit 1
fi

if [ -z "$DIGITALOCEAN_API_TOKEN" ]; then
  echo "Error: DIGITALOCEAN_API_TOKEN environment variable not set" >&2
  exit 1
fi

# Get the latest snapshot ID matching the pattern
LATEST_SNAPSHOT=$(doctl compute snapshot list \
  --format ID,Name,CreatedAt \
  --no-header \
  --access-token "$DIGITALOCEAN_API_TOKEN" | \
  grep "$PATTERN" | \
  sort -k3 -r | \
  head -1 | \
  awk '{print $1}')

if [ -z "$LATEST_SNAPSHOT" ]; then
  echo "Error: No snapshot found matching pattern: $PATTERN" >&2
  exit 1
fi

# Output JSON format for Packer's external data source
echo "{\"id\": \"$LATEST_SNAPSHOT\"}"