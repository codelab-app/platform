#!/usr/bin/env bash

SERVICES="$*"

docker-compose \
  --verbose \
  -f .docker/docker-compose.yaml \
  build $SERVICES