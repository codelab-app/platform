#!/usr/bin/env bash

set -x

ln -s ../codelab-web/vars.tf ./vars-codelab-web.symlink.tf
ln -s ./shared/vars-machine-client.tf ./vars-machine-client.symlink.tf
