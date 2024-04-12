#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# Enter subshell so we don't change dir for next command
# Need to change dir so the $PWD inside the sh is set
(cd ./circleci && ./symlink.sh)
(cd ./circleci-docker && ./symlink.sh)
(cd ./codelab && ./symlink.sh)
(cd ./codelab-api && ./symlink.sh)
(cd ./codelab-landing && ./symlink.sh)
(cd ./codelab-web && ./symlink.sh)
(cd ./auth0 && ./symlink.sh)
