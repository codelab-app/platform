#!/usr/bin/env bash
nx run-many --target=test --all --parallel --maxWorkers=4 $@
# nx affected --target=test --parallel --maxWorkers=8 $@
