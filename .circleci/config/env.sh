#!/bin/bash

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
echo "[env.sh] Version tag found: '${VERSION_TAG:-none}'"

# Check if npx is available
echo "[env.sh] Checking for npx..."
if ! command -v npx &> /dev/null; then
  echo "[env.sh] ERROR: npx not found in PATH"
  echo "[env.sh] PATH: $PATH"
  echo "[env.sh] which npm: $(which npm 2>&1 || echo 'npm not found')"
  echo "[env.sh] which node: $(which node 2>&1 || echo 'node not found')"
  exit 1
else
  echo "[env.sh] npx found at: $(which npx)"
fi

# Check if validate-semver.js exists
if [ ! -f "./scripts/validate-semver.js" ]; then
  echo "[env.sh] ERROR: validate-semver.js not found at ./scripts/validate-semver.js"
  echo "[env.sh] Current directory: $(pwd)"
  echo "[env.sh] Contents of scripts directory:"
  ls -la ./scripts/ 2>&1 || echo "scripts directory not found"
  exit 1
fi

echo "[env.sh] Running validate-semver.js..."
SEMVER_CMD="npx --yes -p semver node ./scripts/validate-semver.js \"$VERSION_TAG\""
echo "[env.sh] Command: $SEMVER_CMD"

# Run the command and capture both stdout and stderr
SEMVER_OUTPUT=$(eval "$SEMVER_CMD" 2>&1)
SEMVER_EXIT_CODE=$?

if [ $SEMVER_EXIT_CODE -ne 0 ]; then
  echo "[env.sh] ERROR: validate-semver.js failed with exit code: $SEMVER_EXIT_CODE"
  echo "[env.sh] Output: $SEMVER_OUTPUT"
  # Don't exit, continue with || true behavior
else
  echo "[env.sh] validate-semver.js succeeded"
  # Execute the output commands
  eval "$SEMVER_OUTPUT"
fi

# Done
echo "[env.sh] Sourcing BASH_ENV..."
if [ -f "$BASH_ENV" ]; then
  source $BASH_ENV
  echo "[env.sh] BASH_ENV sourced successfully"
else
  echo "[env.sh] ERROR: BASH_ENV file not found at: $BASH_ENV"
  exit 1
fi

echo "[env.sh] env.sh completed successfully"

