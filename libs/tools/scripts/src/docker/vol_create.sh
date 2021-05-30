#!/usr/bin/env bash

set -x

# No type=bind, so source is name

# We can `docker cp src codelab-vol:/data` to copy into container

# docker run -it \
#   --rm \
#   --name codelab-volume \
#   --mount source=codelab-volume,target=/app \
#   alpine


# -t flag makes circleci hang indefinitly

docker run \
  -id \
  --name codelab-volume \
  --mount source=codelab-volume,target=/app \
  alpine