#!/usr/bin/env bash
# CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
# LATEST_PUSHED_COMMIT=$(git rev-parse origin/$CURRENT_BRANCH)

echo $CIRCLE_BASE_REVISION
npx commitlint --from=$CIRCLE_BASE_REVISION $@