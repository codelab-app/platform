#!/usr/bin/env bash

SERVICES="$*"

docker-compose \
  -f .docker/docker-compose.yaml \
  up $SERVICES
