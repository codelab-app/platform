#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# CircleCI
ln -s ../auth0/vars.tf ./circleci/vars-auth0.symlink.tf
ln -s ../supabase/vars.tf ./circleci/vars-supabase.symlink.tf
ln -s ../platform/vars.tf ./circleci/vars-platform.symlink.tf
ln -s ../platform-api/vars.tf ./circleci/vars-platform-api.symlink.tf
ln -s ../auth0-vars/vars-secret.tf ./circleci/vars-secret.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./circleci/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-machine-client.tf ./circleci/vars-auth0-machine-client.symlink.tf
ln -s ../slack/vars.tf ./circleci/vars-slack.symlink.tf
ln -s ../nx/vars.tf ./circleci/vars-nx.symlink.tf
ln -s ../cypress/vars.tf ./circleci/vars-cypress.symlink.tf
ln -s ../terraform/vars.tf ./circleci/vars-terraform.symlink.tf
ln -s ../docker/vars.tf ./circleci/vars-docker.symlink.tf
ln -s ../digitalocean/vars-access-token.tf ./circleci/vars-do-access-token.symlink.tf

# DO
ln -s ../mailchimp/vars.tf ./digitalocean/vars-mailchimp.symlink.tf
ln -s ../neo4j/vars.tf ./digitalocean/vars-neo4j.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./digitalocean/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-secret.tf ./digitalocean/vars-auth0-secret.symlink.tf
ln -s ../platform/vars.tf ./digitalocean/vars-platform.symlink.tf
ln -s ../platform-api/vars.tf ./digitalocean/vars-platform-api.symlink.tf

# Auth0
ln -s ../platform/vars.tf ./auth0/vars-platform-web.symlink.tf
