#!/usr/bin/env bash

set -x

husky install
nx run-many --target=build --projects=cli,tools-plugins-codelab,tools-rtk-query
yarn cli dgraph update-schema --env dev
