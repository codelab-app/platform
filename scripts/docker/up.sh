#!/usr/bin/env bash

set -x

SERVICES="$*"

docker-compose \
  --env-file .env.dev \
  -f .docker/docker-compose.yaml \
  up $SERVICES
