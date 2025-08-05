#!/usr/bin/env bash

set -x

# `--no-cache-filter` works only with `docker buildx`
# Without --no-cache-filter=build, Docker layer cache would skip the Nx build step entirely
# when files change. This would use stale build artifacts since Nx's cache lives inside
# the container and isn't accessible to Docker's layer caching decisions.
docker buildx build \
  -f ${PWD}/.docker/prod/sites.Dockerfile \
  -t registry.digitalocean.com/codelabapp/sites:${DOCKER_TAG_VERSION} \
  --build-arg NEXT_PUBLIC_WEB_HOST=${NEXT_PUBLIC_WEB_HOST} \
  --build-arg NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT} \
  --build-arg NEXT_PUBLIC_BASE_API_PATH=${NEXT_PUBLIC_BASE_API_PATH} \
  --build-arg NEXT_PUBLIC_API_HOSTNAME=${NEXT_PUBLIC_API_HOSTNAME} \
  --build-arg AUTH0_SECRET=${AUTH0_SECRET} \
  --build-arg AUTH0_DOMAIN=${AUTH0_DOMAIN} \
  --build-arg AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} \
  --build-arg AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET} \
  --build-arg NX_CLOUD_ACCESS_TOKEN=${NX_CLOUD_ACCESS_TOKEN} \
  --no-cache-filter=build .
