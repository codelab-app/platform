#!/usr/bin/env bash

set -x

if [ "$CI" = false ]; then

husky install
nx run-many --target=build --projects=cli,tools-plugins-codelab
yarn cli dgraph update-schema --env dev
yarn cli dgraph update-schema --env test

fi
