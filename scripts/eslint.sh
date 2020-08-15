#!/usr/bin/env bash
FILES_SINCE_BASE_REVISION=$(git diff-tree --no-commit-id --name-only --diff-filter=d -r $CIRCLE_BASE_REVISION $CIRCLE_REVISION)

echo $CIRCLE_BASE_REVISION
echo $FILES_SINCE_BASE_REVISION