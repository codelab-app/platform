#!/usr/bin/env bash

set -x

rm ./*.symlink.tf

ln -s ../shared/module-auth0.tf ./module-auth0.symlink.tf
ln -s ../shared/vars-auth0.tf ./vars-auth0.symlink.tf
ln -s ../shared/vars-platform-api.tf ./vars-platform-api.symlink.tf
ln -s ../shared/vars-platform.tf ./vars-platform.symlink.tf
ln -s ../shared/vars-supabase.tf ./vars-supabase.symlink.tf
ln -s ../shared/vars-docker.tf ./vars-docker.symlink.tf
