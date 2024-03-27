#!/bin/bash

echo "Executing landing-droplet.sh" >> /var/log/codelab.log

snap install doctl

# Using the doctl Snap? Grant access to the doctl:dot-docker plug to use this command with
snap connect doctl:dot-docker

doctl auth init --interactive false --access-token ${digitalocean_access_token}

doctl registry login

docker compose pull && docker compose up -d --force-recreate
