#!/bin/bash
# script to install dependencies for app
npm install -g bower \
    && bower install --no-interactive \
    && yarn install --frozen-lockfile --ignore-scripts