#!/bin/bash
# Terraform Symlink Migration Script
# This script helps migrate from symlink-based variable sharing to proper module inputs

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$(dirname "$SCRIPT_DIR")"

echo "Terraform Symlink Migration Script"
echo "=================================="
echo ""
echo "This script will help migrate from symlinks to proper Terraform module patterns."
echo "It will NOT make any destructive changes without confirmation."
echo ""

# Function to find all symlink files
find_symlinks() {
    echo "Finding all symlink files..."
    find "$TERRAFORM_DIR" -name "*.symlink.tf" -type l 2>/dev/null || true
}

# Function to find all symlink scripts
find_symlink_scripts() {
    echo "Finding all symlink.sh scripts..."
    find "$TERRAFORM_DIR" -name "symlink.sh" -type f 2>/dev/null || true
}

# Function to backup current state
backup_terraform_state() {
    local env=$1
    local state_dir="$TERRAFORM_DIR/environments/$env"
    local backup_dir="$TERRAFORM_DIR/backups/$(date +%Y%m%d-%H%M%S)"
    
    if [ -d "$state_dir" ]; then
        echo "Creating backup of $env environment..."
        mkdir -p "$backup_dir"
        
        if [ -f "$state_dir/terraform.tfstate" ]; then
            cp "$state_dir/terraform.tfstate" "$backup_dir/${env}-terraform.tfstate"
        fi
        
        # Backup symlink configuration
        if [ -f "$state_dir/symlink.sh" ]; then
            cp "$state_dir/symlink.sh" "$backup_dir/${env}-symlink.sh"
        fi
    fi
}

# Function to remove symlinks in a directory
remove_symlinks() {
    local dir=$1
    echo "Removing symlinks in $dir..."
    find "$dir" -name "*.symlink.tf" -type l -exec rm -v {} \;
}

# Function to analyze module dependencies
analyze_dependencies() {
    local module=$1
    local module_dir="$TERRAFORM_DIR/modules/$module"
    
    if [ -f "$module_dir/symlink.sh" ]; then
        echo ""
        echo "Module: $module"
        echo "Dependencies (from symlink.sh):"
        grep -E "ln -s" "$module_dir/symlink.sh" | sed 's/ln -s/  -/' || true
    fi
}

# Main execution
echo "Step 1: Current Symlink Analysis"
echo "---------------------------------"
SYMLINKS=$(find_symlinks)
SYMLINK_SCRIPTS=$(find_symlink_scripts)

echo "Found $(echo "$SYMLINKS" | wc -l) symlink files"
echo "Found $(echo "$SYMLINK_SCRIPTS" | wc -l) symlink scripts"

echo ""
echo "Step 2: Module Dependency Analysis"
echo "----------------------------------"
for module_dir in "$TERRAFORM_DIR/modules"/*; do
    if [ -d "$module_dir" ]; then
        module=$(basename "$module_dir")
        analyze_dependencies "$module"
    fi
done

echo ""
echo "Step 3: Migration Options"
echo "-------------------------"
echo "1. Dry run - Show what would be changed"
echo "2. Backup only - Create backups of current state"
echo "3. Remove symlinks - Remove all *.symlink.tf files"
echo "4. Full migration - Remove symlinks and update module configurations"
echo "5. Exit"
echo ""
read -p "Select an option (1-5): " option

case $option in
    1)
        echo ""
        echo "Dry Run - Changes that would be made:"
        echo "------------------------------------"
        echo "1. All *.symlink.tf files would be removed"
        echo "2. Module variables.tf files would be updated to include symlinked variables"
        echo "3. Environment configurations would use explicit module inputs"
        echo "4. shared-config module would centralize common variables"
        ;;
    
    2)
        echo ""
        echo "Creating backups..."
        for env in dev test prod ci; do
            backup_terraform_state "$env"
        done
        echo "Backups created in $TERRAFORM_DIR/backups/"
        ;;
    
    3)
        echo ""
        read -p "Are you sure you want to remove all symlinks? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            # Remove symlinks from modules
            for module_dir in "$TERRAFORM_DIR/modules"/*; do
                if [ -d "$module_dir" ]; then
                    remove_symlinks "$module_dir"
                fi
            done
            
            # Remove symlinks from environments
            for env_dir in "$TERRAFORM_DIR/environments"/*; do
                if [ -d "$env_dir" ] && [ "$(basename "$env_dir")" != "shared" ]; then
                    remove_symlinks "$env_dir"
                fi
            done
            
            echo "All symlinks removed successfully"
        fi
        ;;
    
    4)
        echo ""
        echo "Full migration requires manual updates to:"
        echo "1. Module variables.tf files - add variables that were previously symlinked"
        echo "2. Environment main.tf files - pass variables explicitly to modules"
        echo "3. Terraform Cloud workspaces - ensure all variables are defined"
        echo ""
        echo "Recommended migration order:"
        echo "1. Update one module at a time (start with codelab-api)"
        echo "2. Test in dev environment first"
        echo "3. Run 'terraform plan' to ensure no infrastructure changes"
        echo "4. Apply to other environments after validation"
        echo ""
        echo "Migration guide has been created at: $TERRAFORM_DIR/MIGRATION_GUIDE.md"
        
        # Create migration guide
        cat > "$TERRAFORM_DIR/MIGRATION_GUIDE.md" << 'EOF'
# Terraform Symlink Migration Guide

## Overview
This guide helps migrate from symlink-based variable sharing to proper Terraform module patterns.

## Migration Steps

### 1. Update Module Variables
For each module, add variables that were previously symlinked. Example for `codelab-api`:

```hcl
# modules/codelab-api/variables.tf
variable "codelab_app_vpc_id" {
  type        = string
  description = "VPC ID from codelab module"
}

variable "neo4j_uri" {
  type        = string
  description = "Neo4j connection URI"
}
# ... other variables
```

### 2. Update Environment Configuration
Pass variables explicitly to modules:

```hcl
# environments/dev/modules.tf
module "codelab_api" {
  source = "../../modules/codelab-api"
  
  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id
  neo4j_uri          = module.codelab_neo4j.neo4j_uri
  # ... other variables
}
```

### 3. Remove Symlink Scripts
After updating configurations, remove `symlink.sh` scripts.

### 4. Update CI/CD
Update any CI/CD scripts that run `symlink.sh` to remove those steps.

### 5. Validate Changes
Run `terraform plan` in each environment to ensure no infrastructure changes.

## Variable Naming Convention
- Use lowercase with underscores (e.g., `digitalocean_access_token`)
- Remove uppercase duplicates
- Group related variables in Terraform Cloud Variable Sets
EOF
        ;;
    
    5)
        echo "Exiting..."
        exit 0
        ;;
    
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "Migration script completed"