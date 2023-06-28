#!/bin/bash

set -x

# script to compile/build app

# https://github.com/vercel/community/discussions/30
# rm -rf node_modules/.cache/nx
cd ../..
du -sh * | sort -h
nx build platform-api-next -c prod --runner vercel --verbose
