#!/usr/bin/env bash

set -x

yarn cli update-schema --local dev

yarn tunnel

nx serve web --with-deps


