#!/bin/bash
set -e

# Script to clean up old Packer snapshots, keeping only the latest ones
# Run this periodically (e.g., weekly) to prevent snapshot accumulation

if [ -z "$DO_API_TOKEN" ]; then
  echo "Error: DO_API_TOKEN environment variable not set"
  exit 1
fi

echo "Cleaning up old Packer snapshots..."

# Service names to clean up
SERVICES=(
  "codelab-services-base"
  "codelab-consul-server"
  "codelab-api-base"
  "codelab-web-base"
  "codelab-landing-base"
  "codelab-sites-base"
  "codelab-neo4j-base"
)

for SERVICE in "${SERVICES[@]}"; do
  echo ""
  echo "Processing: $SERVICE"
  
  # Get all snapshots for this service, sorted by name (which includes timestamp)
  # Match pattern: codelab-*-base-YYYY-MM-DD-hhmm
  SNAPSHOTS=$(doctl compute snapshot list \
    --format ID,Name \
    --no-header \
    --access-token "$DO_API_TOKEN" | \
    grep "^[0-9]*[[:space:]]*${SERVICE}-[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]" | \
    sort -k2 -r || true)
  
  if [ -z "$SNAPSHOTS" ]; then
    echo "  No snapshots found for $SERVICE"
    continue
  fi
  
  # Keep the latest snapshot, delete the rest
  KEEP_COUNT=1
  COUNT=0
  
  while IFS= read -r line; do
    COUNT=$((COUNT + 1))
    SNAPSHOT_ID=$(echo "$line" | awk '{print $1}')
    SNAPSHOT_NAME=$(echo "$line" | awk '{print $2}')
    
    if [ $COUNT -le $KEEP_COUNT ]; then
      echo "  Keeping latest: $SNAPSHOT_NAME (ID: $SNAPSHOT_ID)"
    else
      echo "  Deleting old: $SNAPSHOT_NAME (ID: $SNAPSHOT_ID)"
      doctl compute snapshot delete "$SNAPSHOT_ID" \
        --force \
        --access-token "$DO_API_TOKEN" || true
    fi
  done <<< "$SNAPSHOTS"
done

echo ""
echo "Cleanup completed!"
echo ""
echo "Current snapshots:"
doctl compute snapshot list \
  --format Name,Size,CreatedAt \
  --access-token "$DO_API_TOKEN" | \
  grep -E "(codelab-|Name)" || true