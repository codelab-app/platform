#!/usr/bin/env bash

set -x

ln -s ../mailchimp/vars.tf ./vars-mailchimp.symlink.tf
ln -s ../neo4j/vars.tf ./vars-neo4j.symlink.tf
ln -s ../auth0/shared/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
ln -s ../auth0/shared/vars-secret.tf ./vars-auth0-secret.symlink.tf
