#!/bin/bash

exit 1

set -x

# script to compile/build app

# https://github.com/vercel/community/discussions/30
# rm -rf node_modules/.cache/nx
cd ../..
du -sh * | sort -h

# https://github.com/nrwl/nx/issues/10256#issuecomment-1233292721

npx nx build platform -c prod --runner vercel --verbose
