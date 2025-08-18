#!/bin/bash
set -ex

echo "Installing DigitalOcean CLI ${DOCTL_VERSION}..."

# Download and install doctl
curl -sSL "https://github.com/digitalocean/doctl/releases/download/v${DOCTL_VERSION}/doctl-${DOCTL_VERSION}-linux-amd64.tar.gz" | tar -xzv
mv doctl /usr/local/bin/
chmod +x /usr/local/bin/doctl

# Create directory for doctl config (will be populated at runtime)
mkdir -p /root/.config/doctl

# Verify installation
doctl version

echo "DigitalOcean CLI installation completed"