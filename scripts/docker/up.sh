#!/usr/bin/env bash

set -x

SERVICES="$*"

docker-compose \
  --env-file .env \
  -f .docker/docker-compose.yaml \
  up -d $SERVICES
