#!/usr/bin/env bash

if [ "$CI" == true ]; then
  nx run-many --target=build --all --parallel --maxWorkers=4 $@
else
  nx affected:build --parallel $@
fi
