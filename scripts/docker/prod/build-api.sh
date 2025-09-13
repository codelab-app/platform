#!/usr/bin/env bash

set -x

# `--no-cache-filter` works only with `docker buildx`
docker buildx build \
  -f ${PWD}/.docker/prod/api.Dockerfile \
  -t registry.digitalocean.com/codelabapp/api:${DOCKER_TAG_VERSION} \
  --no-cache-filter=build .
