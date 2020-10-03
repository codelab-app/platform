#!/usr/bin/env bash

if [ "$CI" == true ]; then
  npx nx run-many --target=test --all --parallel --maxWorkers=4 --silent "$@"
else
  npx nx affected:test --parallel --silent "$@"
fi
