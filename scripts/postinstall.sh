#!/usr/bin/env bash

set -x

husky install
yarn cli update-schema --env dev
nx build cli
