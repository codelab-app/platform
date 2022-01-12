#!/usr/bin/env bash

local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

echo $local_branch_name

# (1) Matches for git feature branch pattern, number followed by lower kebab case
# e.g. 1023-some-feature
# (2) Git tag pattern, prod-*.*.* or stag-*.*.*
# e.g. prod-0.0.1
# (3) master, for pushing tags

valid_branch_regex="^(([0-9]+)(-[a-z][a-z0-9]*)+)|((stag|prod)-(\d|[1-9]\d*)\.(\d|[1-9]\d*)\.(\d|[1-9]\d*)|master)$"

message="
Branch names must be lower kebab case starting with the issue number:\n
  $valid_branch_regex\n
  Eg. 203-your-branch-name\n"

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo -e "$message"
    exit 1
fi

exit 0
