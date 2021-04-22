#!/usr/bin/env bash

set -x

CMD="$*"

npx hasura $CMD --project=hasura --envfile=../.env