#!/bin/bash
# script to install dependencies for app
yarn --version \
  && yarn dlx cross-env CI=true yarn install --immutable
