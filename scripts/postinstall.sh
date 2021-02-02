#!/usr/bin/env bash

if [ "$CI" == true ]; then
  yarn prisma:reset
  yarn prisma:sync
else
  yarn prisma:sync
fi
