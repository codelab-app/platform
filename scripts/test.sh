#!/usr/bin/env bash

if [ "$CI" == true ]; then
  nx run-many --target=test --all --parallel --maxWorkers=4 $@
else
  nx affected:test --parallel $@
fi