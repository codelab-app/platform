#!/usr/bin/env bash

set -x

# Force user to run `yarn install` as a workaround for lack of preinstall script support in Yarn 3
# if [ "$ENABLE_CUSTOM_INSTALL" != true && "$CI" != true ]; then
#   echo 'Please run `yarn setup` to install \n'
#   exit 1
# fi

# Yarn 3 have trouble disabling scripts
# Postinstall is cached! https://github.com/yarnpkg/yarn/issues/7762
if [ "$CI" != true ]; then

  # Never run husky on CI
  # if [ "$CI" != true ]; then
  #   yarn husky install
  # fi

  # Build CLI for later use
  nx build cli
fi

