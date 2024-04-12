#!/usr/bin/env bash

set -x

ln -s ../codelab-web/vars.tf ./vars-codelab-web.symlink.tf
ln -s ../codelab-api/vars.tf ./vars-codelab-api.symlink.tf
ln -s ../auth0/shared/vars-secret.tf ./vars-secret.symlink.tf
ln -s ../auth0/shared/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
ln -s ../auth0/vars.tf ./vars-auth0.symlink.tf
ln -s ../circleci/vars-token.tf ./vars-circleci-token.symlink.tf
