#!/usr/bin/env bash

# This script is called by ECS

yarn cli dgraph update-schema --env ci
yarn cli dgraph reset-data --env ci

# node dist/apps/cli/main.js dgraph reset-data --env ci

node dist/apps/api/main.js
