#!/bin/bash

# Disable exit on error temporarily to see all output
set +e

# Add debug output
echo "[env.sh] Starting script execution"
echo "[env.sh] BASH_ENV: $BASH_ENV"
echo "[env.sh] CIRCLE_SHA1: $CIRCLE_SHA1"
echo "[env.sh] Current directory: $(pwd)"
echo "[env.sh] Shell options: $-"

#
# Git settings
#
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

#
# Docker tag version from git tags
#
echo "[env.sh] Checking for git tags..."
VERSION_TAG=$(git tag --points-at HEAD | grep -E "^[0-9]+\.[0-9]+\.[0-9]+$" | head -1)
echo "[env.sh] VERSION_TAG: '$VERSION_TAG'"

echo "[env.sh] Running validate-semver.js..."

# Load nvm if available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  echo "[env.sh] Loading nvm..."
  export NVM_DIR="$HOME/.nvm"
  source "$NVM_DIR/nvm.sh"
fi

# Use npx with semver package
eval "$(npx --yes -p semver node ./scripts/validate-semver.js "$VERSION_TAG")" || true

# Done
echo "[env.sh] Sourcing BASH_ENV..."
source $BASH_ENV || {
  EXIT_CODE=$?
  echo "[env.sh] Failed to source BASH_ENV with exit code: $EXIT_CODE"
  exit $EXIT_CODE
}

