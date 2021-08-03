#!/usr/bin/env bash

if [ "${CIRCLE_BASE_REVISION}" = "<nil>" ]; then
  echo "commitlint from HEAD^"
  npx commitlint -x @commitlint/config-conventional -f HEAD^
else
  echo "commitlint from ${CIRCLE_BASE_REVISION}"
  br=`git branch -r --contains ${CIRCLE_BASE_REVISION}`
  if [ ! -n $br ]; then
    npx commitlint -x @commitlint/config-conventional -f HEAD^
  else
    npx commitlint -x @commitlint/config-conventional -f "${CIRCLE_BASE_REVISION}"
  fi
fi
