#!/bin/bash

# set -x

# Make CI dashboard more clean
NX_CLOUD_SILENT_OUTPUT=true nx build cli

# Extract the arguments after "pnpm cli"
args=${@#pnpm cli}

node dist/apps/cli/main.js $args