#!/usr/bin/env bash

set -x

ln -s ../digitalocean/vars-access-token.tf ./vars-do-access-token.symlink.tf
ln -s ../codelab/shared/vars-vpc.tf ./vars-vpc.symlink.tf
ln -s ../codelab/shared/vars-domain.tf ./vars-domain.symlink.tf
ln -s ../codelab/shared/vars-certificate.tf ./vars-certificate.symlink.tf
