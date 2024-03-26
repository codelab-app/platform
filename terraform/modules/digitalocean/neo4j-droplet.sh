#!/bin/bash

set -x

# Follow guide here https://www.pulumi.com/ai/answers/c9RUVMFwZWL6RGoVEKvM5y/deploying-neo4j-docker-on-digitalocean-with-typescript
export DEBIAN_FRONTEND=noninteractive

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce

sudo docker run --restart=unless-stopped -d \
  -p 7474:7474 -p 7687:7687 \
  --name=neo4j --env=NEO4J_AUTH=neo4j/test neo4j:latest
