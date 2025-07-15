# Git Tag-Based Version Control for infra-pr Workflow

## Overview

The infra-pr CircleCI workflow uses Git tags to control Docker version updates. 

**Simple rule**: 
- **Tag with version** (e.g., `1.2.3`) → Sets that version
- **No tag** → No version change

## Why Version Tags Matter

DigitalOcean App Platform has issues with reused Docker tags:
- Caches old image digests
- May not pull updated images
- Leads to deployments running old code

**Solution**: Always use unique version tags for deployments.

## Usage

### No Version Change (Default)
```bash
git push origin staging
# Docker version stays the same
```

### Set Specific Version
```bash
git tag 1.2.3
git push origin staging --tags
# Sets Docker version to 1.2.3
```

## Version Validation Rules

1. **Must increase**: `1.0.0` → `1.0.1` ✅, `1.0.1` → `1.0.0` ❌
2. **Patch +1**: `1.0.0` → `1.0.1` ✅, `1.0.0` → `1.0.3` ❌  
3. **Minor resets patch**: `1.0.5` → `1.1.0` ✅, `1.0.5` → `1.1.1` ❌
4. **Major resets both**: `1.2.3` → `2.0.0` ✅, `1.2.3` → `2.1.0` ❌

## Examples

```bash
# Hotfix
git tag 1.0.1
git push --atomic origin staging 1.0.1

# Minor release
git tag 1.1.0
git push --atomic origin staging 1.1.0

# Major release
git tag 2.0.0
git push --atomic origin staging 2.0.0
```

## Auto-cleanup

Version tags are automatically removed after processing to keep the repository clean.

## Implementation

- **Validation script**: `scripts/validate_version_increment.sh`
- **CircleCI job**: `.circleci/config/jobs/setup-infra-workspace.yml`
- **Terraform variable**: `DOCKER_TAG_VERSION` in Terraform Cloud