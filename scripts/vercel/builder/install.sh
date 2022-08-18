#!/bin/bash

# script to install dependencies for app
yarn --version \
  && npx cross-env CI=true yarn install --immutable
