#!/usr/bin/env bash

set -x

CMD="$*"

npx hasura $CMD --project=hasura --envfile=../.env --endpoint=http://127.0.0.1:8081/