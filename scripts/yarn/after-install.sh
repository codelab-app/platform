#!/usr/bin/env bash

set -x

# Yarn 3 have trouble disabling scripts
# Postinstall is cached! https://github.com/yarnpkg/yarn/issues/7762
# So we use afterinstall plugin
if [ "$CI" != true ] && [ "$VERCEL" != "1" ]; then

  # Never run husky on CI
  # if [ "$CI" != true ]; then
  #   yarn husky install
  # fi

  # nx build tools-workspace && yarn link tools-workspace
  # nx run-many --target=build --projects=cli,tools-workspace

  # Build CLI for later use
  # nx build cli
fi
