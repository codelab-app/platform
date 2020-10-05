#!/usr/bin/env bash

set -x

echo "docker/build.sh"
echo $PWD

# docker container ls -a

# ./scripts/docker/vol_ls.sh

docker-compose \
  --verbose \
  -f .docker/docker-compose.yml \
  build codelab
