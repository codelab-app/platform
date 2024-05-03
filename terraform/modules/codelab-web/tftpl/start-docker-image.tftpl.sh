#!/bin/bash

set -x

snap install doctl

snap connect doctl:dot-docker

doctl auth init --interactive false --access-token ${digitalocean_access_token}

doctl registry login

# Allows us to send Docker logs to loki
docker plugin install grafana/loki-docker-driver:2.9.2 --alias loki --grant-all-permissions

mv /etc/docker/daemon.tmp.json /etc/docker/daemon.json

systemctl restart docker

cd /root/docker && docker compose pull && docker compose up -d --force-recreate --remove-orphans
