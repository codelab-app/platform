#!/bin/bash

# Extract the arguments after "yarn cli"
args=${@#yarn cli}

# Convert the arguments into the desired format
formatted_args=$(echo $args | tr ' ' ',')

# Run the nx serve command with the formatted arguments
nx serve cli --watch false --args="$formatted_args"

echo 'DONE'

# Capture the exit code of the last command
exit_code=$?

# Exit this script with the same code
exit $exit_code
