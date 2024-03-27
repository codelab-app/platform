#!/bin/bash

apt-get update

snap install doctl
# Required since doctl can't create this directory
# https://github.com/digitalocean/doctl/issues/591
mkdir ~/.config

sudo doctl auth init --interactive false --access-token ${var.digitalocean_access_token}

# Using the doctl Snap? Grant access to the doctl:dot-docker plug to use this command with
sudo snap connect doctl:dot-docker

doctl registry login

mkdir -p /home/docker
cd /home/docker
touch docker-compose.yml

cat <<\EOF> docker-compose.yml
version: '3.8'
services:
  landing:
    image: registry.digitalocean.com/codelabapp/landing:latest
    restart: unless-stopped
    ports:
      - "80:3000"
    environment:
      - MAILCHIMP_LIST_ID=${MAILCHIMP_LIST_ID}
      - MAILCHIMP_API_KEY=${MAILCHIMP_API_KEY}
      - MAILCHIMP_SERVER_PREFIX=${MAILCHIMP_SERVER_PREFIX}
EOF

docker compose pull && docker compose up -d --force-recreate
