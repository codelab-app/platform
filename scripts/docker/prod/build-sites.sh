#!/usr/bin/env bash

set -x

# `--no-cache-filter` works only with `docker build`
docker buildx build \
  -f ${PWD}/.docker/prod/sites.Dockerfile \
  -t registry.digitalocean.com/codelabapp/web:${DOCKER_TAG_VERSION} \
  --build-arg NEXT_PUBLIC_WEB_HOST=${NEXT_PUBLIC_WEB_HOST} \
  --build-arg NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT} \
  --build-arg NEXT_PUBLIC_API_HOSTNAME=${NEXT_PUBLIC_API_HOSTNAME} \
  --no-cache-filter=build .
