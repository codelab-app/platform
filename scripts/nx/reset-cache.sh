#!/usr/bin/env bash

# set -x

# nx cache seems to grow in size if we don't resize, goes to 20G sometimes
# Go through each directory that has possibly large cache
NX_CACHE_DIRS=(
  ~/project/.nx/cache
  ~/project/.nx/cache-apps
  ~/project/.nx/cache-libs
)
NEXT_DIRS=(
  ~/project/dist/apps/web/.next/cache
  ~/project/dist/apps/landing/.next/cache
  ~/project/dist/apps/sites/.next/cache
)

#
# Step 1: Handle .nx/cache
#
for DIR in "${NX_CACHE_DIRS[@]}"
do
  SIZE=$(du -s $DIR | cut -f1)
  SIZE_MB=$((SIZE / 1024))

  if ((SIZE > 1 * 1024 * 1024)); then
    echo "Directory $DIR is ${SIZE_MB}MB, resetting cache."
    npx nx reset
  else
    echo "Directory $DIR is ${SIZE_MB}MB, keeping cache"
  fi
done

#
# Step 2: Handle Next.js cache directories
#
for DIR in "${NEXT_DIRS[@]}"
do
  # Extract the base directory (remove /cache from the end)
  BASE_DIR=${DIR%/cache}

  # Create ci-lock.yaml only if the parent folder exists
  if [ -d "${BASE_DIR}" ] && [ ! -f "${BASE_DIR}/ci-lock.yaml" ]; then
    echo "1" > "${BASE_DIR}/ci-lock.yaml"
    echo "Created ci-lock.yaml for ${BASE_DIR}"
  fi

  # Calculate size of directory
  SIZE=$(du -s $DIR | cut -f1)
  SIZE_MB=$((SIZE / 1024))

  # Check if size is greater than 300MB
  if ((SIZE > 300 * 1024)); then
    echo "Directory $DIR is ${SIZE_MB}MB, deleting cache."
    rm -rf $DIR

    # Increment the counter in ci-lock.yaml
    if [ -f "${BASE_DIR}/ci-lock.yaml" ]; then
      echo $(( $(cat "${BASE_DIR}/ci-lock.yaml") + 1 )) > "${BASE_DIR}/ci-lock.yaml"
    fi
  else
    echo "Directory $DIR is ${SIZE_MB}MB, keeping cache"
  fi
done
