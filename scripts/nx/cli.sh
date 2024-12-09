#!/bin/bash

set -x

# Extract the arguments after "pnpm cli"
args=${@#pnpm cli}

node dist/apps/cli/main.js $args