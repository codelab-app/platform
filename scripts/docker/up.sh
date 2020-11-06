#!/usr/bin/env bash

set -x

SERVICES="$*"

docker-compose \
  -f .docker/docker-compose.yaml \
  up $SERVICES
