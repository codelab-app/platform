#!/usr/bin/env bash

set -x

ln -s ../codelab-web/vars.tf ./vars-codelab-web.symlink.tf
ln -s ../auth0/shared/vars-secret.tf ./vars-secret.symlink.tf
ln -s ../auth0/shared/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
ln -s ../codelab-api/shared/vars-api-port.tf ./vars-codelab-api-port.symlink.tf
ln -s ../codelab-api/shared/vars-api-hostname.tf ./vars-codelab-api-hostname.symlink.tf
ln -s ../auth0/vars-domain.tf ./vars-auth0-domain.symlink.tf
ln -s ../circleci/vars-token.tf ./vars-circleci-token.symlink.tf
