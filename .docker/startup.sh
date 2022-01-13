#! /bin/bash

# Debugging

# This script is called by ECS

node dist/apps/cli/main.js dgraph update-schema --env ci
node dist/apps/cli/main.js dgraph reset-data --env ci

node dist/apps/api/main.js
