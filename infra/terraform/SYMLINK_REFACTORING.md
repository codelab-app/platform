# Terraform Symlink Refactoring Documentation

## Problem Statement

The current Terraform setup uses symlinks to share variables between modules and environments, which causes:
- OS-dependent behavior (issues on Windows)
- Fragile build process
- Hidden dependencies
- Difficult maintenance

## Solution Overview

Replace symlinks with proper Terraform module patterns:
1. Create a `shared-config` module for centralized variables
2. Update modules to accept explicit inputs
3. Use module composition in environments
4. Leverage Terraform Cloud Variable Sets

## ⚠️ CRITICAL WARNING

The Terraform CLI no longer executes symlink.sh scripts. The following modules still have symlinks and WILL NOT WORK correctly until migrated:
- `auth0` - Has unresolved symlinks
- `circleci` - Has 19 unresolved symlinks
- `circleci-docker` - Has unresolved symlinks

See MIGRATION_NEEDED.md files in each module directory for details.

## Implementation Status

### Completed
- ✅ Created `shared-config` module
- ✅ Refactored all infrastructure modules to use explicit inputs:
  - `codelab` - Core infrastructure (VPC, DNS, Certificate)
  - `codelab-api` - API service (added output.tf)
  - `codelab-web` - Web application
  - `codelab-neo4j` - Database (added output.tf)
  - `codelab-sites` - Preview environments
  - `codelab-landing` - Landing page
- ✅ Updated dev environment configuration:
  - Created comprehensive `modules.tf` with all module definitions
  - Created `variables.tf` with UPPERCASE names matching Terraform Cloud
  - Removed all symlinks from dev environment
- ✅ Updated Terraform CLI service to remove symlink commands
- ✅ Created migration and cleanup scripts

### Pending
- ⏳ Refactor auth0 module (still uses symlinks)
- ⏳ Refactor circleci modules (still use symlinks)
- ⏳ Update prod, test, ci environment configurations
- ⏳ Configure Terraform Cloud Variable Sets
- ⏳ Remove remaining module symlink.sh scripts
- ⏳ Clean up environments/shared directory after migration

## File Structure Changes

### Before
```
modules/codelab-api/
├── vars.tf
├── vars-vpc.symlink.tf -> ../codelab/shared/vars-vpc.tf
├── vars-auth0-domain.symlink.tf -> ../auth0/vars-domain.tf
├── vars-neo4j-uri.symlink.tf -> ../neo4j/vars-uri.tf
└── symlink.sh
```

### After
```
modules/codelab-api/
└── variables.tf (contains all required variables)

modules/shared-config/
├── variables.tf
├── outputs.tf
└── README.md
```

## Module Usage Example

### Before (with symlinks)
```hcl
# Module relies on symlinked variables
resource "digitalocean_droplet" "api" {
  vpc_uuid = var.codelab_app_vpc_id  # From symlink
  region   = var.digitalocean_region  # From symlink
}
```

### After (explicit inputs)
```hcl
# environments/dev/modules.tf

# 1. Shared configuration module
module "shared_config" {
  source = "../../modules/shared-config"
  
  environment               = "dev"
  digitalocean_access_token = var.digitalocean_access_token
  auth0_domain              = var.auth0_domain
  # ... other shared variables
}

# 2. Core infrastructure
module "codelab" {
  source = "../../modules/codelab"
  
  digitalocean_access_token = module.shared_config.digitalocean.access_token
  digitalocean_region       = module.shared_config.digitalocean.region
}

# 3. Database with dependencies
module "codelab_neo4j" {
  source = "../../modules/codelab-neo4j"
  
  # Infrastructure dependencies
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id
  
  # Config from shared module
  digitalocean_access_token = module.shared_config.digitalocean.access_token
  neo4j_password            = module.shared_config.neo4j.password
}

# 4. API with cross-module dependencies
module "codelab_api" {
  source = "../../modules/codelab-api"
  
  # Dependencies from other modules
  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id
  neo4j_uri          = module.codelab_neo4j.neo4j_uri
  
  # Config from shared module
  digitalocean_region = module.shared_config.digitalocean.region
  auth0_domain        = module.shared_config.auth0.domain
  
  # Module-specific variables
  codelab_api_key = var.codelab_api_key
}
```

## Variable Naming Convention

### Important: Case Sensitivity Pattern
- **Environment Variables** (in `environments/*/variables.tf`): Use UPPERCASE
  - These match Terraform Cloud workspace variables
  - Example: `variable "AUTH0_DOMAIN"`, `variable "DIGITALOCEAN_ACCESS_TOKEN"`
- **Module Variables** (in `modules/*/variables.tf`): Use lowercase
  - These are internal module interfaces
  - Example: `variable "auth0_domain"`, `variable "digitalocean_access_token"`
- **Translation happens in environment `modules.tf`**:
  ```hcl
  module "shared_config" {
    auth0_domain = var.AUTH0_DOMAIN  # UPPERCASE env var → lowercase module param
  }
  ```

### Terraform Cloud Variable Sets
Create the following variable sets:

1. **Global Variables** (all workspaces):
   - `digitalocean_region`
   - `docker_registry`

2. **Secrets** (all workspaces, sensitive):
   - `digitalocean_access_token`
   - `auth0_client_secret`
   - `neo4j_password`

3. **Environment-Specific** (per workspace):
   - `auth0_domain`
   - `api_hostname`
   - `web_host`

## Migration Process

### Phase 1: Module Refactoring
1. Run migration script: `./scripts/migrate-from-symlinks.sh`
2. Update module variables.tf files
3. Test with `terraform plan`

### Phase 2: Environment Updates
1. Update environment configurations
2. Remove symlink.sh execution from CI/CD
3. Validate no infrastructure changes

### Phase 3: Cleanup
1. Remove all *.symlink.tf files
2. Delete all symlink.sh scripts
3. Update documentation

## Validation Checklist

- [ ] No infrastructure changes in `terraform plan`
- [ ] All symlinks removed
- [ ] Variables properly scoped
- [ ] CI/CD pipelines updated
- [ ] Documentation updated

## Benefits

1. **Portability**: Works on all operating systems
2. **Clarity**: Explicit dependencies between modules
3. **Maintainability**: Standard Terraform patterns
4. **Type Safety**: Proper variable validation
5. **DRY**: Single source of truth for variables