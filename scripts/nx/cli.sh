#!/bin/bash

set -x

# Extract the arguments after "pnpm cli"
args=${@#pnpm cli}

node apps/cli/dist/main.js $args