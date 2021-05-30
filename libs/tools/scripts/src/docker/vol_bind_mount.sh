#!/usr/bin/env bash

set -x

# Mounts pwd of host to /app in container

docker run -it \
  --rm \
  --name codelab \
  --mount type=bind,source="$(pwd)",target=/app \
  alpine
