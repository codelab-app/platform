#!/usr/bin/env bash

curl -X POST $CODELAB_DGRAPH_ENDPOINT/admin/schema --data-binary '@dgraph/schema.generated.graphql'

node dist/apps/api/main.js
