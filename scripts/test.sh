#!/usr/bin/env bash

if [ "$CI" == true ]; then
  nx run-many --target=test --all --parallel --maxWorkers=4 --silent "$@"
else
  nx affected:test --parallel --silent "$@"
fi
