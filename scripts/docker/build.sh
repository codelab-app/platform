#!/usr/bin/env bash

echo "docker/build.sh"
echo $PWD

docker-compose \
  --verbose \
  -f .docker/docker-compose.yml \
  build codelab
