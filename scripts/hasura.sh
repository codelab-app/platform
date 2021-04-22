#!/usr/bin/env bash

set -x

CMD="$*"

npx hasura $CMD --project=hasura --envfile=../.env --database-name default --endpoint=http://localhost:8080