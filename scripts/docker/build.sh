#!/usr/bin/env bash

# https://makeoptim.com/en/tool/docker-build-not-output/
DOCKER_BUILDKIT=0 \
docker-compose \
  --verbose \
  -f .docker/docker-compose.build.yaml \
  build platform
