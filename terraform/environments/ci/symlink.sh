#!/usr/bin/env bash

set -x

rm ./*.symlink.tf

ln -s ../shared/module-auth0.tf ./module-auth0.symlink.tf
ln -s ../shared/vars-auth0.tf ./vars-auth0.symlink.tf
ln -s ../shared/vars-vercel-platform-api-next.tf ./vars-vercel-platform-api-next.symlink.tf
ln -s ../shared/vars-vercel-platform.tf ./vars-vercel-platform.symlink.tf
ln -s ../shared/vars-supabase.tf ./vars-supabase.symlink.tf
