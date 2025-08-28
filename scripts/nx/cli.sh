#!/bin/bash

nx build cli

# Build the nx command with each argument passed as a separate --args flag
nx_command="nx run cli:run:prod"
for arg in "$@"; do
  nx_command="$nx_command --args=\"$arg\""
done

# Execute the command
eval "$nx_command"