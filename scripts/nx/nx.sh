#!/usr/bin/env bash

set -e

# Nx wrapper script that adds default CLI flags
# Usage: ./scripts/nx/nx.sh <command> [args...]

# Default flags that will be applied to all nx commands
DEFAULT_FLAGS="--outputStyle=stream"


# Execute nx with the default flags and all passed arguments
npx nx "$@" $DEFAULT_FLAGS