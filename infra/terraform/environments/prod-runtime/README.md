# Production Runtime Configuration

This Terraform configuration manages runtime configurations for already-provisioned infrastructure.

## Purpose
Runtime configurations include:
- Grafana dashboards
- Service configurations
- Application settings that can be updated without infrastructure changes

## Usage

### Step 1: Deploy Infrastructure
First, deploy the base infrastructure using the main prod environment:
```bash
pnpm cli terraform apply --stage prod
```

### Step 2: Deploy Runtime Configurations
Once infrastructure is running, deploy runtime configurations:
```bash
pnpm cli terraform apply --stage prod-runtime
```

## Requirements
- Base infrastructure must be provisioned and running
- Services must be accessible (e.g., Grafana at https://grafana.codelab.app)
- Required environment variables:
  ```bash
  export TF_VAR_GRAFANA_ADMIN_PASSWORD="your-password"
  ```

## Updating Configurations
Runtime changes are lightweight and don't affect infrastructure:
```bash
pnpm cli terraform apply --stage prod-runtime
```

This approach ensures fast iterations without infrastructure reprovisioning.