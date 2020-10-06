#!/usr/bin/env bash

set -x

echo "Running install with CI=${CI}, NODE_ENV=${NODE_ENV}"

if [ "$CI" == true ] && [ "$NODE_ENV" == "development" ]; then
  yarn install --frozen-lockfile --non-interactive --production=false
elif [ "$CI" == true ] && [ "$NODE_ENV" == "production" ]; then
  yarn install --frozen-lockfile --non-interactive --production=true
else
  yarn install
fi
