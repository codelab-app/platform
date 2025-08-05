#!/usr/bin/env bash

set -x

# `--no-cache-filter` works only with `docker buildx`
# Without --no-cache-filter=build, Docker layer cache would skip the Nx build step entirely
# when files change. This would use stale build artifacts since Nx's cache lives inside
# the container and isn't accessible to Docker's layer caching decisions.
docker buildx build \
  -f ${PWD}/.docker/prod/landing.Dockerfile \
  -t registry.digitalocean.com/codelabapp/landing:${DOCKER_TAG_VERSION} \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL} \
  --build-arg NEXT_PUBLIC_SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY} \
  --build-arg SUPABASE_DB_PASS=${SUPABASE_DB_PASS} \
  --no-cache-filter=build .
