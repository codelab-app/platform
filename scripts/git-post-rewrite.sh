#!/usr/bin/env bash

echo 'git-post-rewrite'

while read old_commit new_commit extra_info
do
  echo "$old_commit $new_commit $extra_info"
done