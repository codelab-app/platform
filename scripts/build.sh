#!/usr/bin/env bash

echo "Running build with CI=${CI}, NODE_ENV=${NODE_ENV}"

if [ "$CI" == true ] && [ "$NODE_ENV" == "development" ]; then
  npx nx run-many \
    --target=build \
    --all \
    --parallel \
    --maxWorkers=4 \
    "$@"
elif [ "$CI" == true ] && [ "$NODE_ENV" == "production" ]; then
  npx nx run-many \
    --target=build \
    --projects=web,api \
    --with-deps \
    --parallel \
    --skip-nx-cache \
    --maxWorkers=4 \
    "$@"
else
  npx nx affected \
  --target=build \
  --parallel \
  "$@"
fi
