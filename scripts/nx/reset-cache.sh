#!/usr/bin/env bash

# set -x

# nx cache seems to grow in size if we don't resize, goes to 20G sometimes
# Go through each directory that has possibly large cache
DIRS=(
  ~/project/node_modules/.cache
  ~/project/dist/apps/platform/.next
  ~/project/dist/apps/landing/.next
  ~/project/dist/apps/websites/.next
)

for DIR in "${DIRS[@]}"
do
  # Calculate size of directory
  SIZE=$(du -s $DIR | cut -f1)
  SIZE_GB=$((SIZE / 1024 / 1024))

  # Check if size is greater than 2GB
  if ((SIZE > 2 * 1024 * 1024)); then
    echo "Directory $DIR is ${SIZE_GB}GB, deleting cache."
    rm -rf $DIR
  else
    echo "Directory $DIR is ${SIZE_GB}GB, keeping cache"
  fi
done
