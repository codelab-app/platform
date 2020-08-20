#!/usr/bin/env bash
npx nx run-many --target=test --all --parallel --maxWorkers=8 $@
