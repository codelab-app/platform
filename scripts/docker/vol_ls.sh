#!/usr/bin/env bash

set -ex


# Create an alpine container that mounts
# -v [name of volume]:[container path to mount]

docker run -it --rm -v codelab-volume:/app alpine ls -l /app