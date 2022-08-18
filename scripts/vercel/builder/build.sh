#!/bin/bash
# script to compile/build app

# https://github.com/vercel/community/discussions/30
npx cross-env CI=false nx build builder --prod --verbose
