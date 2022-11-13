#!/usr/bin/env bash

set -x

rm ./*.symlink.tf

ln -s ../shared/module-auth0.tf ./module-auth0.symlink.tf

ln -s ../shared/vars-auth0.tf ./vars-auth0.symlink.tf
ln -s ../shared/vars-neo4j.tf ./vars-neo4j.symlink.tf
ln -s ../shared/vars-vercel-builder.tf ./vars-vercel-builder.symlink.tf
