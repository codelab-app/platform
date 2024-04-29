#!/usr/bin/env bash

set -x

ln -s ../digitalocean/vars-access-token.tf ./vars-do-access-token.symlink.tf
ln -s ../digitalocean/vars-region.tf ./vars-region.symlink.tf
