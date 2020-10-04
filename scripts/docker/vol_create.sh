#!/usr/bin/env bash

# No type=bind, so source is name

# We can `docker cp src codelab-vol:/data` to copy into container

docker run -it \
  --rm \
  --name codelab-volume \
  --mount source=codelab-volume,target=/app \
  alpine
