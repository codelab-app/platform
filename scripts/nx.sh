#!/usr/bin/env bash


set -x

ARGS="$*"

npx env-cmd -f .env.test nx $ARGS
