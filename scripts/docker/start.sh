#!/usr/bin/env bash

set -x

SERVICE_NAME="$1"

# Used locally for testing
#
# https://makeoptim.com/en/tool/docker-build-not-output/
DOCKER_BUILDKIT=0 \
docker compose \
  --env-file .env \
  --verbose \
  -f .docker/build.docker-compose.yaml \
  up $SERVICE_NAME
