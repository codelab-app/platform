#!/usr/bin/env bash

# set -x

# nx cache seems to grow in size if we don't resize, goes to 20G sometimes
# Go through each directory that has possibly large cache
NX_CACHE_DIR=~/project/.nx/cache
NEXT_DIRS=(
  ~/project/dist/apps/web/.next/cache
  ~/project/dist/apps/landing/.next/cache
  ~/project/dist/apps/sites/.next/cache
)

#
# Step 1: Handle .nx/cache
#
SIZE=$(du -s $NX_CACHE_DIR | cut -f1)
SIZE_MB=$((SIZE / 1024))

if ((SIZE > 1 * 1024 * 1024)); then
  echo "Directory $NX_CACHE_DIR is ${SIZE_MB}MB, resetting cache."
  npx nx reset
else
  echo "Directory $NX_CACHE_DIR is ${SIZE_MB}MB, keeping cache"
fi

#
# Step 2: Handle Next.js cache directories
#
for DIR in "${NEXT_DIRS[@]}"
do
  # Calculate size of directory
  SIZE=$(du -s $DIR | cut -f1)
  SIZE_MB=$((SIZE / 1024))

  # Check if size is greater than 300MB
  if ((SIZE > 300 * 1024)); then
    echo "Directory $DIR is ${SIZE_MB}MB, deleting cache."
    rm -rf $DIR
  else
    echo "Directory $DIR is ${SIZE_MB}MB, keeping cache"
  fi
done
