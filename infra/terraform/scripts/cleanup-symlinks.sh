#!/bin/bash
# Cleanup script for removing symlinks after migration verification

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$(dirname "$SCRIPT_DIR")"

echo "Symlink Cleanup Script"
echo "====================="
echo ""

# Function to check if an environment is migrated
check_environment_migrated() {
    local env=$1
    local env_dir="$TERRAFORM_DIR/environments/$env"
    
    echo "Checking $env environment..."
    
    # Check if modules.tf exists (indicates migration)
    if [ -f "$env_dir/modules.tf" ]; then
        echo "  ✓ modules.tf found - environment appears to be migrated"
        return 0
    else
        echo "  ✗ modules.tf NOT found - environment needs migration"
        return 1
    fi
}

# Function to list symlinks in an environment
list_env_symlinks() {
    local env=$1
    local env_dir="$TERRAFORM_DIR/environments/$env"
    
    echo "  Symlinks in $env:"
    find "$env_dir" -name "*.symlink.tf" -type l 2>/dev/null | while read -r symlink; do
        echo "    - $(basename "$symlink")"
    done || echo "    None found"
}

# Function to clean up symlinks in an environment
cleanup_env_symlinks() {
    local env=$1
    local env_dir="$TERRAFORM_DIR/environments/$env"
    
    echo "  Removing symlinks from $env..."
    find "$env_dir" -name "*.symlink.tf" -type l -exec rm -v {} \;
    
    if [ -f "$env_dir/symlink.sh" ]; then
        echo "  Removing $env/symlink.sh"
        rm -v "$env_dir/symlink.sh"
    fi
}

# Main execution
echo "Step 1: Environment Migration Status"
echo "-----------------------------------"

ENVS="dev test prod ci"
MIGRATED_ENVS=""
PENDING_ENVS=""

for env in $ENVS; do
    if check_environment_migrated "$env"; then
        MIGRATED_ENVS="$MIGRATED_ENVS $env"
    else
        PENDING_ENVS="$PENDING_ENVS $env"
    fi
    list_env_symlinks "$env"
    echo ""
done

echo "Summary:"
echo "  Migrated environments:$MIGRATED_ENVS"
echo "  Pending migration:$PENDING_ENVS"
echo ""

# Only offer cleanup for migrated environments
if [ -n "$MIGRATED_ENVS" ]; then
    echo "Step 2: Cleanup Options"
    echo "----------------------"
    echo "The following environments appear to be migrated and can have their symlinks removed:"
    echo "$MIGRATED_ENVS"
    echo ""
    read -p "Do you want to remove symlinks from migrated environments? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        for env in $MIGRATED_ENVS; do
            cleanup_env_symlinks "$env"
        done
        echo ""
        echo "Cleanup completed!"
    else
        echo "Cleanup cancelled."
    fi
fi

# Module cleanup status
echo ""
echo "Step 3: Module Cleanup Status"
echo "----------------------------"
echo "Modules that have been migrated (no symlink.sh):"
find "$TERRAFORM_DIR/modules" -type d -maxdepth 1 -mindepth 1 | while read -r module_dir; do
    module=$(basename "$module_dir")
    if [ ! -f "$module_dir/symlink.sh" ] && [ "$module" != "shared-config" ]; then
        echo "  ✓ $module"
    fi
done

echo ""
echo "Modules still using symlinks:"
find "$TERRAFORM_DIR/modules" -name "symlink.sh" -type f | while read -r symlink_script; do
    module=$(basename "$(dirname "$symlink_script")")
    echo "  ✗ $module"
done

echo ""
echo "Done!"