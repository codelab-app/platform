#!/usr/bin/env bash

set -x

rm ./*.symlink.tf

ln -s ../shared/module-auth0.tf ./module-auth0.symlink.tf
ln -s ../shared/vars-codelab-web.tf ./vars-codelab-web.symlink.tf
ln -s ../shared/vars-codelab-api-port.tf ./vars-codelab-api-port.symlink.tf
ln -s ../shared/vars-auth0.tf ./vars-auth0.symlink.tf
ln -s ../shared/vars-auth0-secret.tf ./vars-auth0-secrets.symlink.tf
ln -s ../shared/vars-neo4j-credentials.tf ./vars-neo4j-credentials.symlink.tf
ln -s ../shared/vars-mailchimp.tf ./vars-mailchimp.symlink.tf
ln -s ../shared/vars-docker-tag-version.tf ./vars-docker-tag-version.symlink.tf
ln -s ../shared/vars-terraform.tf ./vars-terraform.symlink.tf
# ln -s ../shared/vars-hotjar.tf ./vars-hotjar.symlink.tf
# ln -s ../shared/vars-intercom.tf ./vars-intercom.symlink.tf
# ln -s ../shared/vars-google.tf ./vars-google.symlink.tf
# ln -s ../shared/vars-supabase.tf ./vars-supabase.symlink.tf
ln -s ../shared/vars-do-access-token.tf ./vars-do-access-token.symlink.tf
ln -s ../shared/vars-do-api-token.tf ./vars-do-api-token.symlink.tf
ln -s ../shared/vars-do-droplet-name.tf ./vars-do-droplet-name.symlink.tf
ln -s ../shared/vars-circleci-token.tf ./vars-circleci-token.symlink.tf
