#!/usr/bin/env bash

set -x

rm ./**/*.symlink.tf

# CircleCI
ln -s ../auth0/vars.tf ./circleci/vars-auth0.symlink.tf
ln -s ../auth0-output/vars.tf ./circleci/vars-auth0-output.symlink.tf

# Vercel Builder
ln -s ../vercel/vars-team-id.tf ./vercel-builder/vars-vercel-team-id.symlink.tf
ln -s ../vercel/vars-api-token.tf ./vercel-builder/vars-vercel-api-token.symlink.tf
ln -s ../auth0/vars.tf ./vercel-builder/vars-auth0.symlink.tf
ln -s ../auth0-output/vars.tf ./vercel-builder/vars-auth0-output.symlink.tf
ln -s ../neo4j/vars.tf ./vercel-builder/vars-neo4j.symlink.tf

# # Vercel Landing
ln -s ../hotjar/vars.tf ./vercel-landing/vars-hotjar.symlink.tf
ln -s ../intercom/vars.tf ./vercel-landing/vars-intercom.symlink.tf
ln -s ../mailchimp/vars.tf ./vercel-landing/vars-mailchimp.symlink.tf
ln -s ../supabase/vars.tf ./vercel-landing/vars-supabase.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-landing/vars-vercel-team-id.symlink.tf

# # Vercel Website
ln -s ../auth0/vars.tf ./vercel-websites/vars-auth0.symlink.tf
ln -s ../auth0-output/vars.tf ./vercel-websites/vars-auth0-output.symlink.tf
ln -s ../neo4j/vars.tf ./vercel-websites/vars-neo4j.symlink.tf
ln -s ../vercel/vars-team-id.tf ./vercel-websites/vars-vercel-team-id.symlink.tf
ln -s ../vercel/vars-api-token.tf ./vercel-websites/vars-api-token.symlink.tf
