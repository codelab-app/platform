#!/usr/bin/env bash
nx affected --target=test --parallel --maxWorkers=8 $@
