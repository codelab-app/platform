#!/usr/bin/env bash

# This is copied from https://circleci.com/developer/orbs/orb/conventional-changelog/commitlint
# Had issue using it as a job, so we copied the source and modified it

current_branch="$(git rev-parse --abbrev-ref HEAD)"
target_branch=master
git_log="$(git log --reverse --max-count=10 --format="format:%H")"

if [ -z "$git_log" ]; then
  echo "[WARNING] There are no commits in the log to lint."
  exit 0
fi

# If there is only one commit, set target_head to that commit
if [ "$(echo "$git_log" | wc -l | xargs)" == "1" ]; then
  target_head=""
elif [ "$current_branch" != "$target_branch" ]; then
  # Using the ^ at the end git logs lower bound is not inclusive
  target_head="$(git cherry "$target_branch" | head -1 | cut -d " " -f2-)^"
else
  commit="$(echo "$git_log" | head -1)"
  target_head="$(git log "$commit^" -1 --pretty=%H)"
fi

npx commitlint --verbose --from="$target_head"
