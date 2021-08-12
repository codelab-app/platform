#!/usr/bin/env bash

# Check if CIRCLECI_BASE_REVISION is valid, if not then use it

echo $CIRCLE_BASE_REVISION
echo "$(git branch -r --contains ${CIRCLE_BASE_REVISION})"

echo $CIRCLE_REVISION
echo "$(git branch -r --contains ${CIRCLE_REVISION})"

echo $CIRCLE_SHA1
echo "$(git branch -r --contains ${CIRCLE_SHA1})"

br="$(git branch -r --contains "${CIRCLE_BASE_REVISION}")"

if [[ -z $br ]]; then
  # Print the last 10 commits in long hash format
  # Then get the last one
  from="$(git log -10 --pretty=format:"%H" | tail -n 1)"

  npx commitlint --from "$from"
else
  npx commitlint --from "${CIRCLE_BASE_REVISION}"
fi


