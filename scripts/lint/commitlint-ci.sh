#!/usr/bin/env bash

# Check if CIRCLECI_BASE_REVISION is valid, if not then use it

br="$(git branch -r --contains "${CIRCLE_BASE_REVISION}")"

echo $br

if [[ -z $br ]]; then
  # Print the last 10 commits in long hash format
  # Then get the last one
  from="$(git log -10 --pretty=format:"%H" | tail -n 1)"

  npx commitlint --from "$from"
else
  npx commitlint --from "${CIRCLE_BASE_REVISION}"
fi


#if [ "${CIRCLE_BASE_REVISION}" = "<nil>" ]; then
#  echo "commitlint from HEAD^"
#  npx commitlint -x @commitlint/config-conventional -f HEAD^
#else
#  echo "commitlint from ${CIRCLE_BASE_REVISION}"
#  br=`git branch -r --contains ${CIRCLE_BASE_REVISION}`
#  if [ ! -n $br ]; then
#    npx commitlint -x @commitlint/config-conventional -f HEAD^
#  else
#    npx commitlint -x @commitlint/config-conventional -f "${CIRCLE_BASE_REVISION}"
#  fi
#fi
