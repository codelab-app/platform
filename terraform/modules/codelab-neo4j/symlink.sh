#!/usr/bin/env bash

set -x

ln -s ../digitalocean/vars-access-token.tf ./vars-do-access-token.symlink.tf
ln -s ../codelab/shared/vars-vpc.tf ./vars-vpc.symlink.tf
# ln -s ../auth0/vars-domain.tf ./vars-auth0-domain.symlink.tf
ln -s ../neo4j/vars-credentials.tf ./vars-neo4j-credentials.symlink.tf
ln -s ../loki/shared/vars-loki-url.tf ./vars-loki-url.symlink.tf
ln -s ../digitalocean/vars-region.tf ./vars-region.symlink.tf
