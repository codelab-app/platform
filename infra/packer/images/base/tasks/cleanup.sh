#!/bin/bash
set -e

# Clean package manager (can save 200-500MB+ in image size)
apt-get clean              # Remove ALL cached packages from /var/cache/apt/archives/
apt-get autoremove -y --purge  # Remove orphaned dependencies and their config files
apt-get autoclean          # Remove obsolete packages from cache (redundant after clean, but ensures thorough cleanup)

# Remove package lists (will be regenerated on first apt update)
rm -rf /var/lib/apt/lists/*

# Remove documentation
rm -rf /usr/share/doc/*
rm -rf /usr/share/man/*
rm -rf /usr/share/info/*
rm -rf /usr/share/lintian/*

# Keep only essential locales
find /usr/share/locale -mindepth 1 -maxdepth 1 ! -name 'en' -exec rm -rf {} +

# Clean caches
find /var/cache -type f -delete 2>/dev/null || true

# Truncate logs (preserve files for services)
find /var/log -type f -exec truncate -s 0 {} \;

# Remove temporary files
rm -rf /tmp/* /var/tmp/*

# Clear bash history
cat /dev/null > ~/.bash_history
history -c || true

# Clean cloud-init state including machine-id
# This sets machine-id to "uninitialized\n" for proper first boot detection
cloud-init clean --seed --logs --machine-id

# Ensure dbus machine-id is linked properly
rm -f /var/lib/dbus/machine-id
ln -sf /etc/machine-id /var/lib/dbus/machine-id

# Remove SSH host keys (will be regenerated on first boot)
# This ensures each instance has unique SSH keys
rm -f /etc/ssh/ssh_host_*

# Zero out free space for better compression
dd if=/dev/zero of=/EMPTY bs=1M 2>/dev/null || true
rm -f /EMPTY

# Sync filesystem
sync

# Trim filesystem to minimize snapshot size
# Reduces the final image size by releasing unused blocks
fstrim -av || true