#!/usr/bin/env bash

set -x

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <service_name>..."
  exit 1
fi


# Used locally for testing
#
# https://makeoptim.com/en/tool/docker-build-not-output/
DOCKER_BUILDKIT=0 \
docker compose \
  --env-file .env \
  --verbose \
  -f .docker/prod/build.docker-compose.yaml \
  build "$@"
