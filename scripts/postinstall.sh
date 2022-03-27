#!/usr/bin/env bash

set -x

# Yarn 3 have trouble disabling scripts
if [ "$CI" != true ]; then

  husky install

  # Build only required projects
  nx run-many --target=build --projects=cli
fi
