#!/bin/bash
set -e

echo "Installing Consul and Consul-Template..."

# Install from Official HashiCorp APT Repository
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    tee /etc/apt/sources.list.d/hashicorp.list
apt-get update
apt-get install -y consul consul-template

# Enable bash completion
consul -autocomplete-install || true

# Verify installations (consul-template doesn't have a simple version command)
consul version || true
which consul-template && echo "Consul-Template installed at $(which consul-template)"

echo "Consul installation completed"