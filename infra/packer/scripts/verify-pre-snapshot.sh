#!/bin/bash
# Script to verify machine-id and system state before creating snapshot
# This should be run at the end of Packer build to confirm cleanup worked

set -e

echo "=========================================="
echo "Pre-Snapshot Verification Script"
echo "=========================================="
echo ""

# Check machine-id is uninitialized
echo "1. Checking machine-id state (should be uninitialized):"
MACHINE_ID_CONTENT=$(cat /etc/machine-id)
MACHINE_ID_LENGTH=$(wc -c < /etc/machine-id)

echo "   - Content: '$MACHINE_ID_CONTENT'"
echo "   - Length: $MACHINE_ID_LENGTH bytes"

if [ "$MACHINE_ID_CONTENT" = "uninitialized" ] && [ "$MACHINE_ID_LENGTH" -eq 14 ]; then
    echo "   ✓ Machine-id is properly uninitialized for first boot"
else
    echo "   ✗ Machine-id is NOT properly uninitialized!"
    echo "     Expected: 'uninitialized' (14 bytes)"
    echo "     Got: '$MACHINE_ID_CONTENT' ($MACHINE_ID_LENGTH bytes)"
fi
echo ""

# Check dbus machine-id symlink
echo "2. Checking dbus machine-id symlink:"
if [ -L /var/lib/dbus/machine-id ]; then
    TARGET=$(readlink /var/lib/dbus/machine-id)
    if [ "$TARGET" = "/etc/machine-id" ]; then
        echo "   ✓ /var/lib/dbus/machine-id correctly symlinked to /etc/machine-id"
    else
        echo "   ✗ /var/lib/dbus/machine-id symlinked to wrong target: $TARGET"
    fi
else
    echo "   ✗ /var/lib/dbus/machine-id is not a symlink"
fi
echo ""

# Check SSH host keys are removed
echo "3. Checking SSH host keys (should be removed):"
SSH_KEY_COUNT=$(ls -1 /etc/ssh/ssh_host_* 2>/dev/null | wc -l)
if [ "$SSH_KEY_COUNT" -eq 0 ]; then
    echo "   ✓ SSH host keys properly removed"
else
    echo "   ✗ Found $SSH_KEY_COUNT SSH host key file(s) that should be removed:"
    ls -1 /etc/ssh/ssh_host_* 2>/dev/null | sed 's/^/     /'
fi
echo ""

# Check services are disabled (should not start during build)
echo "4. Checking services are disabled for build:"
SERVICES=(
    "consul"
    "docker-login"
    "docker-consul-template"
    "alloy-consul-template"
    "alloy"
)

for service in "${SERVICES[@]}"; do
    if systemctl is-enabled "$service" 2>/dev/null | grep -q "disabled"; then
        echo "   ✓ $service is disabled (correct for snapshot)"
    else
        STATUS=$(systemctl is-enabled "$service" 2>/dev/null || echo "not found")
        if [ "$STATUS" = "not found" ]; then
            echo "   - $service not found (may be OK for base image)"
        else
            echo "   ✗ $service is enabled (should be disabled): $STATUS"
        fi
    fi
done
echo ""

# Check enable-services.service is enabled
echo "5. Checking enable-services.service:"
if systemctl is-enabled enable-services.service 2>/dev/null | grep -q "enabled"; then
    echo "   ✓ enable-services.service is enabled (will run on first boot)"
else
    STATUS=$(systemctl is-enabled enable-services.service 2>/dev/null || echo "not found")
    echo "   ✗ enable-services.service status: $STATUS (should be enabled)"
fi
echo ""

# Check cloud-init state
echo "6. Checking cloud-init state:"
if [ -d /var/lib/cloud ]; then
    INSTANCE_COUNT=$(find /var/lib/cloud/instances -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l)
    if [ "$INSTANCE_COUNT" -eq 0 ]; then
        echo "   ✓ Cloud-init instance data properly cleaned"
    else
        echo "   ✗ Found $INSTANCE_COUNT cloud-init instance(s) that should be cleaned"
    fi
else
    echo "   ✓ No cloud-init data directory found"
fi
echo ""

# Summary
echo "=========================================="
echo "Summary:"
echo "=========================================="

READY_FOR_SNAPSHOT=true

if [ "$MACHINE_ID_CONTENT" != "uninitialized" ] || [ "$MACHINE_ID_LENGTH" -ne 14 ]; then
    echo "✗ Machine-id not properly uninitialized"
    READY_FOR_SNAPSHOT=false
fi

if [ "$SSH_KEY_COUNT" -gt 0 ]; then
    echo "✗ SSH host keys not removed"
    READY_FOR_SNAPSHOT=false
fi

if [ "$READY_FOR_SNAPSHOT" = true ]; then
    echo "✓ System is ready for snapshot! All pre-snapshot checks passed."
else
    echo "✗ System is NOT ready for snapshot. Fix issues above before creating image."
    exit 1
fi