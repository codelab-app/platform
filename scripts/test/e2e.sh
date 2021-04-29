#!/usr/bin/env bash

# nx serve api
# nx run web:serve:ci

npx concurrently \
  --kill-others \
  --success=first \
    "npx wait-on -d 1000 \
      http://127.0.0.1:3001 \
      http://127.0.0.1:4001 && \
      nx run web-e2e:e2e:ci" \
    "npx env-cmd -f .env cross-env PORT=4001 \
      node dist/apps/api/codelab/main.js" \
    "npx next start -p 3001 dist/apps/web"

