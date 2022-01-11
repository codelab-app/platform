#!/usr/bin/env bash

set -x

SERVICES="$*"

# docker-compose has issues with docker context
# https://www.digitalocean.com/community/questions/ssh-connect-to-host-64-227-117-45-port-22-connection-refused

docker-compose \
  --env-file .env \
  -f .docker/docker-compose.yaml \
  up -d $SERVICES
