#!/bin/bash
# script to compile/build app

# https://www.codegrepper.com/code-examples/whatever/Vercel+Treating+warnings+as+errors+because+process.env.CI+%3D+true
npx cross-env CI=false nx build builder --prod --verbose
