#!/bin/bash

# script to install dependencies for app
yarn --version \
  && npx cross-env CI=false yarn install --immutable
