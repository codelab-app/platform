#!/usr/bin/env bash

set -x

SERVICES="$*"

if [ "$CI" == true ]; then
  echo $DOCKER_PASS | docker login --username $DOCKER_USER --password-stdin
else
  docker login
fi

docker-compose \
  --env-file .env \
  --verbose \
  -f .docker/docker-compose.build.yaml \
  push $SERVICES
