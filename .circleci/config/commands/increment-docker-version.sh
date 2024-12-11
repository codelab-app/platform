#!/usr/bin/env bash

set -x

DOCKER_IMAGE_VARSET_ID=varset-QsPqjR3sNKYngPkD
DOCKER_VERSION_ID=var-NNpHfuH5cUmk9kCP
ORGANIZATION_NAME=codelab-app
WORKSPACE_NAME=prod

# This is the current value from Terraform cloud
# x.x.x
REMOTE_DOCKER_VERSION=$(curl \
  --header "Authorization: Bearer $TERRAFORM_ORGANIZATION_TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  https://app.terraform.io/api/v2/varsets/$DOCKER_IMAGE_VARSET_ID/relationships/vars | jq -r '.data[] | select(.attributes.key == "DOCKER_TAG_VERSION") | .attributes.value')

# Increment the last x portion
# x.x.x -> x.x.x+1
# 0.30.0 -> 0.30.1
export DOCKER_VERSION=$(echo $REMOTE_DOCKER_VERSION | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')

# Subsitute the payload with new docker version
envsubst < .circleci/config/commands/increment-docker-version.tmpl.json > .circleci/config/commands/increment-docker-version.payload.json

# Update remote terraform cloud with new docker version
curl \
	--header "Authorization: Bearer $TERRAFORM_ORGANIZATION_TOKEN" \
	--header "Content-Type: application/vnd.api+json" \
	--request PATCH \
	--data @.circleci/config/commands/increment-docker-version.payload.json \
	https://app.terraform.io/api/v2/varsets/$DOCKER_IMAGE_VARSET_ID/relationships/vars/$DOCKER_VERSION_ID