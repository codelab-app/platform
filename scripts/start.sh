#!/usr/bin/env bash

if [ "$NODE_ENV" == "production" ]; then
  # Start PM2
  pm2 startOrReload config/pm2.json

else
  # Build lint tools
  ./scripts/build.sh

  # Start frontend + backend
  npx nx run-many --target=serve --projects=web,api
fi
