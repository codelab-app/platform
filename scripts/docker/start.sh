#!/usr/bin/env bash

SERVICES="$*"

docker-compose \
  -f .docker/docker-compose.yml \
  up $SERVICES
