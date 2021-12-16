#!/usr/bin/env bash

set -x

husky install

# Build only required projects
nx run-many --target=build --projects=cli,cmd,tools-plugins-codelab,tools-rtk-query

# Update Dgraph Schema
yarn cli dgraph update-schema --env dev

# Install bower components for animation related libs
bower install --no-interactive


