#!/bin/bash
npm install -g bower \
    && bower install --no-interactive \
    && yarn install --frozen-lockfile --ignore-scripts