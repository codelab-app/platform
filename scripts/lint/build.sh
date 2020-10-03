#!/usr/bin/env bash

# Build lint tools
npx nx run-many --target=build --projects=tools-eslint-config-codelab
