#!/usr/bin/env bash

set -x

# docker compose --verbose -f .docker/prod/build.docker-compose.yaml \

# Don't use $NX_BASE, or $CIRCLECI_PREV_SHA, since these refer to the base master branch
# CIRCLE_PREV_SHA=$(git rev-parse HEAD~1)

# # Returns `web` if affected, otherwise `""`
# NO_CACHE_FILTER=$(pnpm nx show projects --affected --type app --base=$CIRCLE_PREV_SHA | grep -qw "web" && echo "--no-cache-filter build" || echo "")

# `--no-cache-filter` works only with `docker build`
docker buildx build \
  -f ${PWD}/.docker/prod/web.Dockerfile \
  -t registry.digitalocean.com/codelabapp/web:${DOCKER_TAG_VERSION} \
  --build-arg NEXT_PUBLIC_WEB_HOST=${NEXT_PUBLIC_WEB_HOST} \
  --build-arg NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT} \
  --build-arg NEXT_PUBLIC_BASE_API_PATH=${NEXT_PUBLIC_BASE_API_PATH} \
  --build-arg NEXT_PUBLIC_API_HOSTNAME=${NEXT_PUBLIC_API_HOSTNAME} \
  --build-arg AUTH0_SECRET=${AUTH0_SECRET} \
  --build-arg AUTH0_DOMAIN=${AUTH0_DOMAIN} \
  --build-arg AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} \
  --build-arg AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET} \
  --no-cache-filter=build .
