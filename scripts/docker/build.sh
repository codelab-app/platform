#!/usr/bin/env bash

set -x

SERVICES="$*"

# if [ "$CI" != true ]; then
#   yarn
#   yarn build
#   yarn -c prod
#   rm -rf node_modules/.cache
# fi

docker-compose \
  --env-file .env \
  -f .docker/docker-compose.build.yaml \
  build \
  $SERVICES
