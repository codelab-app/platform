#!/usr/bin/env bash

set -x

ln -s ../platform/vars.tf ./vars-platform.symlink.tf
ln -s ../platform-api/vars.tf ./vars-platform-api.symlink.tf
ln -s ../auth0-vars/vars-secret.tf ./vars-secret.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
ln -s ../auth0/vars.tf ./vars-auth0.symlink.tf
ln -s ../circleci/vars-token.tf ./vars-circleci-token.symlink.tf
