#!/usr/bin/env bash
rm -rf build
yarn nx run-many --target=build --all --parallel --maxWorkers=2 $@