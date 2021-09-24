#!/usr/bin/env bash

set -x

husky install
nx build cli
yarn cli dgraph update-schema --env dev
yarn cli dgraph update-schema --env test
