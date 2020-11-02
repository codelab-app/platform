#!/usr/bin/env bash

set -x

SERVICES="$*"

if [ "$CI" != true ]; then
  yarn

  yarn build

  yarn --prod

  rm -rf node_modules/.cache
fi

cp .env.example .env

docker-compose \
  --verbose \
  -f .docker/docker-compose.yaml \
  build \
  $SERVICES
