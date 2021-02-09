#!/usr/bin/env bash

if [ "$CI" == true ]; then
  echo ''
  # yarn prisma:reset
  # yarn prisma:sync
  # yarn prisma generate
else
  yarn prisma:sync
  yarn prisma generate
fi
