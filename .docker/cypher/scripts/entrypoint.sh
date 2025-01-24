#!/bin/bash

echo 'Starting entrypoint...'

# Start Neo4j normally in the background using the official entrypoint
# that comes with the image
/startup/docker-entrypoint.sh neo4j &

# Reuse the logic from the health check to determine when Neo4j is ready
until wget -O /dev/null -q http://localhost:7474; do
  sleep 1
done

echo 'Neo4j ready...'


/scripts/enable-cdc.sh

/scripts/apply-constraints.sh

# Keep container running in the foreground
tail -f /dev/null
