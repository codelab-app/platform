#!/usr/bin/env bash

docker-compose \
  --verbose \
  -f .docker/docker-compose.yml \
  build codelab