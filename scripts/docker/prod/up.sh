#!/usr/bin/env bash

set -x

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <service_name>..."
  exit 1
fi

# docker-compose has issues with docker context
# https://www.digitalocean.com/community/questions/ssh-connect-to-host-64-227-117-45-port-22-connection-refused

docker compose \
  --env-file .env \
  -f .docker/prod/docker-compose.yaml \
  up -d --force-recreate "$@"
