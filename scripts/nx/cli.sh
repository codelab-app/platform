#!/bin/bash

set -x

# Extract the arguments after "yarn cli"
args=${@#yarn cli}

# Run the nx serve command with the formatted arguments
nx build cli && node dist/apps/cli/main.js $args

echo 'DONE'

# echo $exit_code

# # Exit this script with the same code
# exit $exit_code
