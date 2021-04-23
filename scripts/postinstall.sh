#!/usr/bin/env bash

if [ "$CI" == true ]; then
  yarn codegen
  make hasura-migrations-apply
  make hasura-metadata-apply
fi
