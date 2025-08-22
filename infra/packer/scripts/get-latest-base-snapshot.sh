#!/bin/bash
set -e

# Script to get the latest base snapshot ID
# Checks for services-base first, falls back to app-base for backwards compatibility

if [ -z "$DO_API_TOKEN" ]; then
  echo "Error: DO_API_TOKEN environment variable not set" >&2
  exit 1
fi

# Try services-base first
LATEST_SNAPSHOT=$(doctl compute snapshot list \
  --format ID,Name,CreatedAt \
  --no-header \
  --access-token "$DO_API_TOKEN" | \
  grep "codelab-services-base" | \
  sort -k3 -r | \
  head -1 | \
  awk '{print $1}')

# Fall back to app-base if services-base not found
if [ -z "$LATEST_SNAPSHOT" ]; then
  LATEST_SNAPSHOT=$(doctl compute snapshot list \
    --format ID,Name,CreatedAt \
    --no-header \
    --access-token "$DO_API_TOKEN" | \
    grep "codelab-app-base" | \
    sort -k3 -r | \
    head -1 | \
    awk '{print $1}')
fi

if [ -z "$LATEST_SNAPSHOT" ]; then
  echo "Error: No base snapshot found (tried services-base and app-base)" >&2
  exit 1
fi

# Output JSON format for Packer's external data source
echo "{\"id\": \"$LATEST_SNAPSHOT\"}"