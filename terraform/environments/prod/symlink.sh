#!/usr/bin/env bash

set -x

rm ./*.symlink.tf

ln -s ../shared/module-auth0.tf ./module-auth0.symlink.tf
ln -s ../shared/vars-platform.tf ./vars-platform.symlink.tf
ln -s ../shared/vars-platform-api.tf ./vars-platform-api.symlink.tf
ln -s ../shared/vars-auth0.tf ./vars-auth0.symlink.tf
ln -s ../shared/vars-neo4j.tf ./vars-neo4j.symlink.tf
ln -s ../shared/vars-mailchimp.tf ./vars-mailchimp.symlink.tf
ln -s ../shared/vars-hotjar.tf ./vars-hotjar.symlink.tf
ln -s ../shared/vars-intercom.tf ./vars-intercom.symlink.tf
ln -s ../shared/vars-google.tf ./vars-google.symlink.tf
ln -s ../shared/vars-supabase.tf ./vars-supabase.symlink.tf
ln -s ../shared/vars-digitalocean.tf ./vars-digitalocean.symlink.tf
ln -s ../shared/vars-aws.tf ./vars-aws.symlink.tf
