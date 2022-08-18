#!/bin/bash

# Recommended to set CI to false
# https://github.com/vercel/community/discussions/30

# But this is the only way to opt out of postinstall
npx cross-env CI=true yarn install --immutable
