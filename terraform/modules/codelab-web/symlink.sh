#!/usr/bin/env bash

set -x

ln -s ../digitalocean/vars-access-token.tf ./vars-do-access-token.symlink.tf
ln -s ../codelab/shared/vars-vpc.tf ./vars-vpc.symlink.tf
ln -s ../codelab/shared/vars-certificate.tf ./vars-certificate.symlink.tf
ln -s ../codelab-api/vars.tf ./vars-codelab-api.symlink.tf
ln -s ../auth0/shared/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
ln -s ../auth0/shared/vars-secret.tf ./vars-auth0-secret.symlink.tf
ln -s ../auth0/vars.tf ./vars-auth0.symlink.tf

# ln -s ../mailchimp/vars.tf ./vars-mailchimp.symlink.tf
# ln -s ../neo4j/vars.tf ./vars-neo4j.symlink.tf
# ln -s ../auth0/shared/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
# ln -s ../auth0/shared/vars-secret.tf ./vars-auth0-secret.symlink.tf
# ln -s ../codelab-web/vars.tf ./vars-codelab-web.symlink.tf
