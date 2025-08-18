#!/bin/bash
set -e

# Install HashiCorp GPG key and repository (official method)
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list

# Update and install Consul and Consul-Template
apt-get update
apt-get install -y consul consul-template

# Create consul directories (user already created by package)
mkdir -p /opt/consul /etc/consul.d
chown -R consul:consul /opt/consul /etc/consul.d

echo "Consul and Consul-Template installed successfully"