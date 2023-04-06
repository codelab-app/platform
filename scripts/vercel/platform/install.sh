#!/bin/bash

# Recommended to set CI to false
# https://github.com/vercel/community/discussions/30

# Set our own custom env variable to skip post-install
npx cross-env SKIP_POST_INSTALL=true yarn install --immutable
