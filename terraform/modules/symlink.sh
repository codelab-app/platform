#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# Enter subshell so we don't change dir for next command
# Need to change dir so the $PWD inside the sh is set
(cd ./circleci && ./symlink.sh)
(cd ./circleci-docker && ./symlink.sh)
(cd ./digitalocean && ./symlink.sh)
(cd ./auth0 && ./symlink.sh)
