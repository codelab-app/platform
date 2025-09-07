#!/bin/bash
# Script to verify first-boot behavior on new droplets
# Run this on a newly created droplet to confirm everything is working

set -e

echo "=========================================="
echo "First-Boot Verification Script"
echo "=========================================="
echo ""

# Check machine-id
echo "1. Checking machine-id status:"
echo "   - Machine-id length: $(wc -c < /etc/machine-id) bytes"
echo "   - Machine-id content: $(cat /etc/machine-id)"
if [ "$(wc -c < /etc/machine-id)" -eq 33 ]; then
    echo "   ✓ Machine-id is properly set (32 hex chars + newline)"
else
    echo "   ✗ Machine-id length is incorrect"
fi
echo ""

# Check if first-boot service ran
echo "2. Checking enable-services.service (first-boot):"
systemctl status enable-services.service --no-pager | grep -E "(Active:|Main PID:|ConditionFirstBoot)" || true
if systemctl is-enabled enable-services.service >/dev/null 2>&1; then
    echo "   ✓ enable-services.service is enabled"
else
    echo "   ✗ enable-services.service is not enabled"
fi
echo ""

# Check core services
echo "3. Checking core services status:"
SERVICES=(
    "consul"
    "docker-login"
    "docker-consul-template"
    "alloy-consul-template"
    "alloy"
)

for service in "${SERVICES[@]}"; do
    if systemctl is-active "$service" >/dev/null 2>&1; then
        echo "   ✓ $service is active"
    else
        echo "   ✗ $service is not active ($(systemctl is-active $service 2>/dev/null || echo 'unknown'))"
    fi
done
echo ""

# Check docker-compose service (for service images)
echo "4. Checking docker-compose.service (if applicable):"
if systemctl list-units --all | grep -q docker-compose.service; then
    if systemctl is-active docker-compose.service >/dev/null 2>&1; then
        echo "   ✓ docker-compose.service is active"
    else
        echo "   ✗ docker-compose.service is not active ($(systemctl is-active docker-compose.service 2>/dev/null || echo 'unknown'))"
    fi
else
    echo "   - docker-compose.service not found (base/consul-server image)"
fi
echo ""

# Check Docker containers (for service images with containers)
echo "5. Checking Docker containers:"
if command -v docker >/dev/null 2>&1; then
    CONTAINER_COUNT=$(docker ps --format "table {{.Names}}\t{{.Status}}" | tail -n +2 | wc -l)
    if [ "$CONTAINER_COUNT" -gt 0 ]; then
        echo "   ✓ Found $CONTAINER_COUNT running container(s):"
        docker ps --format "table {{.Names}}\t{{.Status}}" | tail -n +2 | sed 's/^/     /'
    else
        echo "   - No containers running (may be normal for base/consul-server)"
    fi
else
    echo "   ✗ Docker not found"
fi
echo ""

# Check cloud-init status
echo "6. Checking cloud-init status:"
if command -v cloud-init >/dev/null 2>&1; then
    cloud-init status || true
else
    echo "   ✗ cloud-init not found"
fi
echo ""

# Summary
echo "=========================================="
echo "Summary:"
echo "=========================================="

ISSUES=0

# Machine-id check
if [ "$(wc -c < /etc/machine-id)" -ne 33 ]; then
    echo "✗ Machine-id not properly initialized"
    ((ISSUES++))
fi

# Service checks
for service in "${SERVICES[@]}"; do
    if ! systemctl is-active "$service" >/dev/null 2>&1; then
        echo "✗ Service $service is not active"
        ((ISSUES++))
    fi
done

if [ "$ISSUES" -eq 0 ]; then
    echo "✓ All checks passed! First-boot configuration is working correctly."
else
    echo "✗ Found $ISSUES issue(s) that need attention."
fi