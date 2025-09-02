#!/bin/bash

# set -x

# IMPORTANT: Do not run 'nx build cli' before executing this script
# Running nx build before nx lint in the same shell script causes Nx Cloud cache failures
# This only happens when both commands run in the same process because:
# 1. The Nx daemon persists state across commands within the same shell process
# 2. Build command modifies the daemon's internal cache/workspace context
# 3. This contaminated state affects subsequent lint command's cache hash calculation
# 4. When run in separate shell sessions, each gets a fresh daemon state
# The shared daemon state in a single process causes cache corruption/misses

# Skip build on CircleCI
if [ -z "$CIRCLECI" ]; then
  nx build cli
fi

# Extract the arguments after "pnpm cli"
args=${@#pnpm cli}

node dist/apps/cli/main.js $args