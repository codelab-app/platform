#!/usr/bin/env bash

set -x

husky install
 nx run-many --target=build --projects=cli,cmd,tools-plugins-codelab
 yarn cli dgraph update-schema --env dev
