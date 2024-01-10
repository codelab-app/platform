#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# CircleCI
ln -s ../auth0/vars.tf ./circleci/vars-auth0.symlink.tf
ln -s ../supabase/vars.tf ./circleci/vars-supabase.symlink.tf
# ln -s ../vercel-platform/vars.tf ./circleci/vars-vercel-platform.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./circleci/vars-auth0-secret.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./circleci/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-machine-client.tf ./circleci/vars-auth0-machine-client.symlink.tf
ln -s ../slack/vars.tf ./circleci/vars-slack.symlink.tf
ln -s ../nx/vars.tf ./circleci/vars-nx.symlink.tf
ln -s ../cypress/vars.tf ./circleci/vars-cypress.symlink.tf
ln -s ../terraform/vars.tf ./circleci/vars-terraform.symlink.tf

# Auth0
ln -s ../codelab/vars-platform-web.tf ./auth0/vars-platform-web.symlink.tf
