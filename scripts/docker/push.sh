#!/usr/bin/env bash

if [ "$CI" == true ]; then
  echo $DOCKER_PASS | docker login --username $DOCKER_USER --password-stdin
fi

docker-compose \
  -f .docker/docker-compose.yaml \
  push codelab
