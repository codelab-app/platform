#!/usr/bin/env bash

local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex='^([0-9]*-)([a-z][a-z]*)(-[a-z]+)*$'

message="
Branch names must be kebab case starting with issue number:\n
  $valid_branch_regex\n
  Eg. 203-your-branch-name\n"

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo -e "$message"
    exit 1
fi

exit 0