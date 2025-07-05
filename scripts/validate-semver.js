#!/usr/bin/env node

// Validate semantic version and output bash exports
const semver = require('semver');

const version = process.argv[2];

if (!version || version.trim() === '') {
  console.log('No version tag found on current commit - using \'latest\'');
  console.log('echo "export DOCKER_TAG_VERSION=latest" >> $BASH_ENV');
  console.log('echo "export TF_VAR_DOCKER_TAG_VERSION=latest" >> $BASH_ENV');
  process.exit(0);
}

if (semver.valid(version)) {
  console.log(`✓ Version '${version}' is valid`);
  console.log(`echo "export DOCKER_TAG_VERSION=${version}" >> $BASH_ENV`);
  console.log(`echo "export TF_VAR_DOCKER_TAG_VERSION=${version}" >> $BASH_ENV`);
  process.exit(0);
} else {
  console.error(`Error: Version '${version}' is not a valid semantic version`);
  process.exit(1);
}