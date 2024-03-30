#!/usr/bin/env bash

set -x

ln -s ../auth0/vars.tf ./vars-auth0.symlink.tf
ln -s ../supabase/vars.tf ./vars-supabase.symlink.tf
ln -s ../platform/vars.tf ./vars-platform.symlink.tf
ln -s ../platform-api/vars.tf ./vars-platform-api.symlink.tf
ln -s ../auth0-vars/vars-secret.tf ./vars-auth0-secret.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-machine-client.tf ./vars-auth0-machine-client.symlink.tf
ln -s ../auth0/vars-cypress-user.tf ./vars-auth0-cypress-user.symlink.tf
ln -s ../slack/vars.tf ./vars-slack.symlink.tf
ln -s ../nx/vars.tf ./vars-nx.symlink.tf
ln -s ../cypress/vars.tf ./vars-cypress.symlink.tf
ln -s ../terraform/vars.tf ./vars-terraform.symlink.tf
ln -s ../docker/vars.tf ./vars-docker.symlink.tf
ln -s ../digitalocean/vars-access-token.tf ./vars-do-access-token.symlink.tf
