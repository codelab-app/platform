#!/bin/bash
# script to install dependencies for app
npm install -g bower \
  && bower install --no-interactive \
  && npx cross-env CI=true yarn install --immutable
