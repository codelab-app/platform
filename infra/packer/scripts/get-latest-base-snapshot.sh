#!/bin/bash
set -e

# Script to get the latest services-base snapshot ID

if [ -z "$DO_API_TOKEN" ]; then
  echo "Error: DO_API_TOKEN environment variable not set" >&2
  exit 1
fi

# Get latest services-base snapshot
LATEST_SNAPSHOT=$(doctl compute snapshot list \
  --format ID,Name,CreatedAt \
  --no-header \
  --access-token "$DO_API_TOKEN" | \
  grep "codelab-services-base" | \
  sort -k3 -r | \
  head -1 | \
  awk '{print $1}')

if [ -z "$LATEST_SNAPSHOT" ]; then
  echo "Error: No services-base snapshot found" >&2
  exit 1
fi

# Output JSON format for Packer's external data source
echo "{\"id\": \"$LATEST_SNAPSHOT\"}"