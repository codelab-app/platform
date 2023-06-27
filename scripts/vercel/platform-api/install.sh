#!/bin/bash

set -x

# Recommended to set CI to false
# https://github.com/vercel/community/discussions/30

cd ../..
echo $PWD
yarn install --immutable
