#!/bin/bash

# Recommended to set CI to false
# https://github.com/vercel/community/discussions/30

# Set our own custom env variable to skip post-install
npx cross-env CI=false SKIP_POST_INSTALL=true yarn install --immutable
rm -rf node_modules/.cache/nx
