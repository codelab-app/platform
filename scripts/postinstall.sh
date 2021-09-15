#!/usr/bin/env bash

set -x

husky install
nx build cli
yarn cli update-schema --env dev
yarn cli update-schema --env local
