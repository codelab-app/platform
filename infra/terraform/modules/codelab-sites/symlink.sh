#!/usr/bin/env bash

set -x

ln -s ../digitalocean/vars-access-token.tf ./vars-do-access-token.symlink.tf
ln -s ../digitalocean/vars-region.tf ./vars-region.symlink.tf
ln -s ../codelab/shared/vars-vpc.tf ./vars-vpc.symlink.tf
ln -s ../codelab/shared/vars-domain.tf ./vars-domain.symlink.tf
ln -s ../codelab/shared/vars-certificate.tf ./vars-certificate.symlink.tf
# ln -s ../codelab-api/shared/vars-api-port.tf ./vars-codelab-api-port.symlink.tf
# ln -s ../codelab-api/shared/vars-api-hostname.tf ./vars-codelab-api-hostname.symlink.tf
# ln -s ../auth0/shared/vars-web-client.tf ./vars-auth0-web-client.symlink.tf
# ln -s ../auth0/shared/vars-secret.tf ./vars-auth0-secret.symlink.tf
# ln -s ../auth0/vars-domain.tf ./vars-auth0-domain.symlink.tf
ln -s ../docker/vars-tag-version.tf ./vars-docker-tag-version.symlink.tf
ln -s ../loki/shared/vars-loki-url.tf ./vars-loki-url.symlink.tf
