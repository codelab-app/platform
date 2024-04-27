#!/usr/bin/env bash

set -x

# docker compose --verbose -f .docker/prod/build.docker-compose.yaml \

CIRCLE_PREV_SHA=$(git rev-parse HEAD~1)

echo $NX_BASE
echo $CIRCLE_PREV_SHA

# Returns `web` if affected, otherwise `""`
NO_CACHE_FILTER=$(pnpm nx show projects --affected --type app --base=$CIRCLE_PREV_SHA | grep -qw "api" && echo "--no-cache-filter build" || echo "")

echo $NO_CACHE_FILTER

# `--no-cache-filter` works only with `docker build`
docker buildx build \
  -f ${PWD}/.docker/prod/api.Dockerfile \
  -t registry.digitalocean.com/codelabapp/api:${DOCKER_TAG_VERSION} \
  $NO_CACHE_FILTER .
