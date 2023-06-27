#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# CircleCI
ln -s ../auth0/vars.tf ./circleci/vars-auth0.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./circleci/vars-auth0-secret.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./circleci/vars-auth0-web-client.symlink.tf

# Api
ln -s ../platform-api/vars.tf ./circleci/vars-platform-api.symlink.tf

# Vercel Platform
ln -s ../vercel/vars-team-id.tf ./vercel-platform/vars-vercel-team-id.symlink.tf
ln -s ../vercel/vars-api-token.tf ./vercel-platform/vars-vercel-api-token.symlink.tf
ln -s ../platform-api/vars.tf ./vercel-platform/vars-platform-api.symlink.tf
ln -s ../auth0/vars.tf ./vercel-platform/vars-auth0.symlink.tf
# ln -s ../auth0/vars-m2m-client.tf ./vercel-platform/vars-auth0-m2m-client.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./vercel-platform/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./vercel-platform/vars-auth0-secret.symlink.tf
ln -s ../neo4j/vars.tf ./vercel-platform/vars-neo4j.symlink.tf

# # Vercel Landing
ln -s ../hotjar/vars.tf ./vercel-landing/vars-hotjar.symlink.tf
ln -s ../intercom/vars.tf ./vercel-landing/vars-intercom.symlink.tf
ln -s ../mailchimp/vars.tf ./vercel-landing/vars-mailchimp.symlink.tf
ln -s ../supabase/vars.tf ./vercel-landing/vars-supabase.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-landing/vars-vercel-team-id.symlink.tf

# # Vercel Website
ln -s ../auth0/vars.tf ./vercel-websites/vars-auth0.symlink.tf
ln -s ../auth0-vars/vars-web-client.tf ./vercel-websites/vars-auth0-web-client.symlink.tf
ln -s ../auth0-vars/vars-auth0-secret.tf ./vercel-websites/vars-auth0-secret.symlink.tf
ln -s ../neo4j/vars.tf ./vercel-websites/vars-neo4j.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-websites/vars-vercel-team-id.symlink.tf
ln -s ../vercel/vars-api-token.tf ./vercel-websites/vars-api-token.symlink.tf
