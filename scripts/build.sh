#!/usr/bin/env bash
rm -rf build
nx run-many --target=build --all --parallel $@
# nx run-many --target=build --all $@