#!/usr/bin/env bash

set -x

SERVICES="$*"

if [ "$CI" != true ]; then
  env > ./.env
  yarn
  yarn build
  yarn --prod
  rm -rf node_modules/.cache
fi

docker-compose \
  --verbose \
  -f .docker/docker-compose.yaml \
  build \
  $SERVICES
