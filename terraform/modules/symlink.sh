#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# CircleCI
ln -s ../auth0/vars.tf ./circleci/vars-auth0.symlink.tf
ln -s ../supabase/vars.tf ./circleci/vars-supabase.symlink.tf
ln -s ../vercel-platform/vars.tf ./circleci/vars-vercel-platform.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./circleci/vars-auth0-secret.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./circleci/vars-auth0-web-client.symlink.tf
ln -s ../slack/vars.tf ./circleci/vars-slack.symlink.tf
ln -s ../nx/vars.tf ./circleci/vars-nx.symlink.tf
ln -s ../vercel/vars.tf ./circleci/vars-vercel.symlink.tf
ln -s ../cypress/vars.tf ./circleci/vars-cypress.symlink.tf
ln -s ../terraform/vars.tf ./circleci/vars-terraform.symlink.tf
ln -s ../vercel-platform-api/vars.tf ./circleci/vars-platform-api.symlink.tf

# Vercel Platform
ln -s ../vercel-platform-api/vars.tf ./vercel-platform/vars-platform-api.symlink.tf
ln -s ../auth0/vars.tf ./vercel-platform/vars-auth0.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./vercel-platform/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./vercel-platform/vars-auth0-secret.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-platform/vars-vercel-team-id.symlink.tf

# Vercel Platform API
ln -s ../vercel/vars.tf ./vercel-platform-api/vars-vercel.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-platform-api/vars-vercel-team-id.symlink.tf
ln -s ../neo4j/vars.tf ./vercel-platform-api/vars-neo4j.symlink.tf

# # Vercel Landing
ln -s ../hotjar/vars.tf ./vercel-landing/vars-hotjar.symlink.tf
ln -s ../intercom/vars.tf ./vercel-landing/vars-intercom.symlink.tf
ln -s ../mailchimp/vars.tf ./vercel-landing/vars-mailchimp.symlink.tf
ln -s ../supabase/vars.tf ./vercel-landing/vars-supabase.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-landing/vars-vercel-team-id.symlink.tf

# Vercel Website
ln -s ../auth0/vars.tf ./vercel-websites/vars-auth0.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./vercel-websites/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./vercel-websites/vars-auth0-secret.symlink.tf
ln -s ../neo4j/vars.tf ./vercel-websites/vars-neo4j.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-websites/vars-vercel-team-id.symlink.tf

# Auth0
ln -s ../vercel-platform/vars.tf ./auth0/vars-vercel-platform.symlink.tf
