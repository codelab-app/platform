#!/bin/bash

# Enable debugging
set -x

# Exit on error and print the error
set -e
trap 'echo "Error on line $LINENO: Command failed with exit code $?"' ERR

echo "=== Starting env.sh setup ==="
echo "Current directory: $(pwd)"
echo "BASH_ENV: $BASH_ENV"

#
# Git settings
#
echo "=== Setting up Git environment variables ==="
echo "export GIT_COMMIT_MSG=$(git log --format=format:\"%s\" -n 1 ${CIRCLE_SHA1})" >> $BASH_ENV

#
# Global environments
#
echo "export TZ=Asia/Hong_Kong" >> $BASH_ENV

echo "export COLOR_FAILURE='#ffccc7'" >> $BASH_ENV
echo "export COLOR_SUCCESS='#b7eb8f'" >> $BASH_ENV

echo "export GITHUB_WEBBER=webberwang" >> $BASH_ENV
echo "export GITHUB_VLADSLAV=vladyslav-polishchuk" >> $BASH_ENV
echo "export GITHUB_ASSIM=assimhabeek" >> $BASH_ENV
echo "export GITHUB_YASEEN=mohasarc" >> $BASH_ENV
echo "export GITHUB_ELHAM=melhamin" >> $BASH_ENV

echo "export SLACK_WEBBER=U0J401GAH" >> $BASH_ENV
echo "export SLACK_U049ASJ65PH=U0J401GAH" >> $BASH_ENV
echo "export SLACK_ASSIM=U02GJN72TKR" >> $BASH_ENV
echo "export SLACK_YASEEN=U03B5N7J2N9" >> $BASH_ENV
echo "export SLACK_ELHAM=U0406P3J9T6" >> $BASH_ENV

echo "export SLACK_CHANNEL_UPDATE=CQVPNKS8K" >> $BASH_ENV

echo "export NEO4J_PASSWORD=password" >> $BASH_ENV
echo "export NEO4J_URI=bolt://127.0.0.1:7687" >> $BASH_ENV
echo "export NEO4J_USER=neo4j" >> $BASH_ENV

#
# Slack settings
#
echo "=== Setting up Slack mentions ==="
echo "CIRCLE_USERNAME: '$CIRCLE_USERNAME'"

if [ "$CIRCLE_USERNAME" == "$GITHUB_VLADSLAV" ]; then
  echo "export SLACK_PARAM_MENTIONS=\<@${SLACK_VLADSLAV}\>" >> $BASH_ENV
elif [ "$CIRCLE_USERNAME" == "$GITHUB_ASSIM" ]; then
  echo "export SLACK_PARAM_MENTIONS=\<@${SLACK_ASSIM}\>" >> $BASH_ENV
elif [ "$CIRCLE_USERNAME" == "$GITHUB_YASEEN" ]; then
  echo "export SLACK_PARAM_MENTIONS=\<@${SLACK_YASEEN}\>" >> $BASH_ENV
elif [ "$CIRCLE_USERNAME" == "$GITHUB_ELHAM" ]; then
  echo "export SLACK_PARAM_MENTIONS=\<@${SLACK_ELHAM}\>" >> $BASH_ENV
else
  echo "export SLACK_PARAM_MENTIONS=\<@${SLACK_WEBBER}\>" >> $BASH_ENV
fi

echo "Slack mentions setup completed"

#
# Docker tag version from git tags
#
echo "=== Setting up Docker version tag ==="
echo "Checking for version tags at HEAD..."
VERSION_TAG=$(git tag --points-at HEAD | grep -E "^[0-9]+\.[0-9]+\.[0-9]+$" | head -1 || true)
echo "VERSION_TAG found: '$VERSION_TAG'"

echo "=== Running validate-semver.js ==="
echo "Node version: $(node --version)"
echo "Script exists: $(ls -la ./scripts/validate-semver.js 2>&1 || echo 'Script not found')"

if [ -f "./scripts/validate-semver.js" ]; then
    echo "Running: node ./scripts/validate-semver.js '$VERSION_TAG'"
    node ./scripts/validate-semver.js "$VERSION_TAG" || {
        echo "validate-semver.js failed with exit code $?"
        exit 1
    }
    echo "validate-semver.js completed successfully"
    eval "$(node ./scripts/validate-semver.js "$VERSION_TAG")"
else
    echo "ERROR: ./scripts/validate-semver.js not found!"
    exit 1
fi

# Done
echo "=== Sourcing BASH_ENV ==="
source $BASH_ENV || {
    echo "Failed to source BASH_ENV"
    exit 1
}
echo "=== env.sh setup completed successfully ==="