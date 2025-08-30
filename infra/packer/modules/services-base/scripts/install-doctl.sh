#!/bin/bash
set -ex

echo "Installing DigitalOcean CLI ${DOCTL_VERSION}..."

# Detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
  DOCTL_ARCH="linux-arm64"
else
  DOCTL_ARCH="linux-amd64"
fi

echo "Detected architecture: $ARCH, using doctl binary: $DOCTL_ARCH"

# Download to /tmp first for cleaner installation
cd /tmp
wget -q "https://github.com/digitalocean/doctl/releases/download/v${DOCTL_VERSION}/doctl-${DOCTL_VERSION}-${DOCTL_ARCH}.tar.gz"
tar xf "doctl-${DOCTL_VERSION}-${DOCTL_ARCH}.tar.gz"
mv doctl /usr/local/bin/
chmod +x /usr/local/bin/doctl
rm "doctl-${DOCTL_VERSION}-${DOCTL_ARCH}.tar.gz"

# Create directory for doctl config (will be populated at runtime)
mkdir -p /root/.config/doctl

# Verify installation
doctl version

echo "DigitalOcean CLI installation completed"