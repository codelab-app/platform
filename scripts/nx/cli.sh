#!/bin/bash

# set -x

nx build cli

# Extract the arguments after "pnpm cli"
args=${@#pnpm cli}

node dist/apps/cli/main.js $args