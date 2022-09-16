#!/bin/bash
# script to compile/build app

# https://github.com/vercel/community/discussions/30
rm -rf node_modules/.cache/nx
du -sh * | sort -h
npx cross-env CI=false nx build builder --prod --verbose
