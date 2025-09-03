#!/usr/bin/env bash
set -euo pipefail

# Mitogen installation script for Ansible performance optimization
# Provides 5-20x speedup for Ansible playbooks

MITOGEN_VERSION="0.3.27"
MITOGEN_DIR="/opt/mitogen-${MITOGEN_VERSION}"
# Using PyPI URL for the official release
MITOGEN_URL="https://files.pythonhosted.org/packages/source/m/mitogen/mitogen-${MITOGEN_VERSION}.tar.gz"

echo "Installing Mitogen ${MITOGEN_VERSION} for Ansible optimization..."

# Check if already installed
if [ -d "${MITOGEN_DIR}" ]; then
    echo "Mitogen ${MITOGEN_VERSION} is already installed at ${MITOGEN_DIR}"
    exit 0
fi

# Create temp directory
TEMP_DIR=$(mktemp -d)
cd "${TEMP_DIR}"

# Download Mitogen
echo "Downloading Mitogen..."
curl -L -o "mitogen-${MITOGEN_VERSION}.tar.gz" "${MITOGEN_URL}"

# Extract to /opt (requires sudo)
echo "Extracting to ${MITOGEN_DIR} (requires sudo)..."
sudo mkdir -p /opt
sudo tar -xzf "mitogen-${MITOGEN_VERSION}.tar.gz" -C /opt/

# Verify installation
if [ -d "${MITOGEN_DIR}/ansible_mitogen" ]; then
    echo "✓ Mitogen installed successfully at ${MITOGEN_DIR}"
    echo ""
    echo "To enable Mitogen, uncomment the following lines in ansible.cfg:"
    echo "  strategy_plugins = ${MITOGEN_DIR}/ansible_mitogen/plugins/strategy"
    echo "  strategy = mitogen_linear"
else
    echo "✗ Installation failed"
    exit 1
fi

# Cleanup
cd -
rm -rf "${TEMP_DIR}"

echo ""
echo "Installation complete!"
echo ""
echo "To enable in ansible.cfg, replace the path and uncomment:"
echo "  strategy_plugins = ${MITOGEN_DIR}/ansible_mitogen/plugins/strategy"
echo "  strategy = mitogen_linear"