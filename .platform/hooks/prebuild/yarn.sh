#!/bin/bash

# install yarn
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

# install
cd /var/app/staging/

# debugging..
ls -lah

yarn install --frozen-lockfile --prod=true

chown -R webapp:webapp node_modules/ || true # allow to fail