#!/usr/bin/env bash

# This script is called by ECS

node dist/apps/cli/main.js dgraph reset-data --env ci

node dist/apps/api/main.js
