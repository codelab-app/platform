#!/usr/bin/env bash

set -x

# docker compose --verbose -f .docker/prod/build.docker-compose.yaml \

CIRCLE_PREV_SHA=$(git rev-parse HEAD~1)

echo $NX_BASE
echo $CIRCLE_PREV_SHA

# Returns `web` if affected, otherwise `""`
NO_CACHE_FILTER=$(pnpm nx show projects --affected --type app --base=$CIRCLE_PREV_SHA | grep -qw "landing" && echo "build" || echo "")

echo $NO_CACHE_FILTER

# `--no-cache-filter` works only with `docker build`
docker buildx build -f ${PWD}/.docker/prod/landing.Dockerfile -t registry.digitalocean.com/codelabapp/landing:${DOCKER_TAG_VERSION} \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL} \
  --build-arg NEXT_PUBLIC_SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY} \
  --build-arg SUPABASE_DB_PASS=${SUPABASE_DB_PASS} \
  --no-cache-filter=$NO_CACHE_FILTER .
