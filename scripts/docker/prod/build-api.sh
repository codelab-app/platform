#!/usr/bin/env bash

set -x

# `--no-cache-filter` works only with `docker buildx`
# Without --no-cache-filter=build, Docker layer cache would skip the Nx build step entirely
# when files change. This would use stale build artifacts since Nx's cache lives inside
# the container and isn't accessible to Docker's layer caching decisions.
docker buildx build \
  -f ${PWD}/.docker/prod/api.Dockerfile \
  -t registry.digitalocean.com/codelabapp/api:${DOCKER_TAG_VERSION} \
  --no-cache-filter=build .
