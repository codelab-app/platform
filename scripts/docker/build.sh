#!/usr/bin/env bash

set -x

SERVICES="$*"

# if [ "$CI" != true ]; then
#   yarn
#   yarn build
#   yarn --prod
#   rm -rf node_modules/.cache
# fi

docker-compose \
  --env-file .env \
  --verbose \
  -f .docker/docker-compose.build.yaml \
  build \
  $SERVICES