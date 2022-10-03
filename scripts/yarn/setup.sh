#!/usr/bin/env bash

# The can be called if yarn postinstall doesn't run because of cache issues

set -x

# Pull in the submodules after installing
git submodule update --init --recursive

# Then link those files to our main project
node ./scripts/yarn/copy-and-link.js

# Install
yarn

nx build cli

