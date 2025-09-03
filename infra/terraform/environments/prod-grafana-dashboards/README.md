# Grafana Dashboard Configuration

This Terraform configuration manages Grafana dashboards separately from infrastructure.

## Usage

### Step 1: Deploy Grafana Infrastructure
First, deploy the Grafana droplet using the main prod environment:
```bash
cd ../prod
terraform apply
```

### Step 2: Wait for Grafana to be Ready
Ensure Grafana is accessible at https://grafana.codelab.app

### Step 3: Deploy Dashboards
Once Grafana is running, deploy the dashboards:
```bash
cd ../prod-grafana-dashboards
terraform init
terraform apply
```

## Requirements
- Grafana must be running and accessible
- `GRAFANA_ADMIN_PASSWORD` must be set as an environment variable:
  ```bash
  export TF_VAR_GRAFANA_ADMIN_PASSWORD="your-password"
  ```

## Updating Dashboards
Simply edit the dashboard JSON files in `modules/grafana-dashboards/dashboards/` and run:
```bash
terraform apply
```

Only changed dashboards will be updated.