#!/usr/bin/env bash

# Run only if certain username

# Get the current git username
git_username=$(git config user.name)

# Check if the git username matches "myusername"
if [ "$git_username" = "Webber Wang" ]; then
    # Run your pre-commit commands here
    echo "Running pre-commit script for $git_username"

    # For example, run tests:
    circleci config pack .circleci/config/ > .circleci/config.yml
    npx prettier --write .circleci/config.yml

    exit_status=$?
    if [ $exit_status -ne 0 ]; then
        echo "Pre-commit script failed."
        exit 1
    fi
fi

exit 0
