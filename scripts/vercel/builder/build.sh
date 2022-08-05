#!/bin/bash
# script to compile/build app
# echo "https://${VERCEL_URL}"

npx nx build builder --prod --verbose
