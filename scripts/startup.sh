#!/usr/bin/env bash

node dist/apps/cli/main.js dgraph reset-data --env ci

node dist/apps/api/main.js
