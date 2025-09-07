#!/bin/bash
set -e

# Clean cloud-init state including machine-id
# This sets machine-id to "uninitialized\n" for proper first boot detection
cloud-init clean --seed --logs --machine-id

# Ensure dbus machine-id is linked properly
rm -f /var/lib/dbus/machine-id
ln -sf /etc/machine-id /var/lib/dbus/machine-id