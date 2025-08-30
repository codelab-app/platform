# Consul + Terraform Cloud Operations Runbook

## Architecture Summary

```
Terraform Cloud                 Consul Server              Droplets
┌──────────────┐               ┌─────────────┐           ┌──────────────┐
│  Variables   │──terraform──→ │   KV Store  │ ←─watch── │Consul-Template│
│  (Source)    │    apply      │  (Runtime)  │           │   (Render)    │
└──────────────┘               └─────────────┘           └──────────────┘
```

## Common Operations

### 1. Normal Update Flow (Through Terraform Cloud)

```bash
# Step 1: Update variable in Terraform Cloud UI or API
# https://app.terraform.io/app/codelab-app/workspaces/prod/variables

# Step 2: Queue plan
terraform plan

# Step 3: Apply changes (syncs to Consul automatically)
terraform apply

# Step 4: Verify in Consul
consul kv get config/docker/api_tag_version
```

**Result**: All droplets automatically update within 30 seconds, zero downtime.

### 2. Emergency Hotfix (Direct to Consul)

```bash
# EMERGENCY ONLY - bypasses Terraform Cloud
consul kv put config/docker/api_tag_version "0.2.7-hotfix"

# Services update immediately
# Remember to update Terraform Cloud later to sync
```

### 3. Service-Specific Updates

```bash
# Update only API
consul kv put config/docker/api_tag_version "0.2.9"

# Update only Web
consul kv put config/docker/web_tag_version "0.3.1"

# Update only Neo4j
consul kv put config/docker/neo4j_tag_version "5.14.0"
```

### 4. Feature Flag Management

```bash
# Enable feature (instant, no Terraform needed)
consul kv put config/features/new_ui "true"

# Disable feature
consul kv put config/features/new_ui "false"

# Check current flags
consul kv get -recurse config/features/
```

### 5. Configuration Rollback

```bash
# Quick rollback
consul kv put config/docker/api_tag_version "0.2.7"

# Or restore from Terraform
terraform apply -refresh-only
```

## Monitoring & Debugging

### Check Service Health
```bash
# SSH to any droplet
consul members
consul catalog services
consul catalog nodes -service=api
```

### View Current Configuration
```bash
# All config
consul kv get -recurse config/

# Specific service
consul kv get -recurse config/docker/
consul kv get -recurse config/api/
```

### Watch Configuration Changes
```bash
# Real-time monitoring
consul watch -type=keyprefix -prefix=config/ cat
```

### Debug Consul-Template
```bash
# Check if template is working
systemctl status consul-template
journalctl -u consul-template -f

# Test template rendering
consul-template -dry -once -config=/etc/consul-template/consul-template.hcl
```

### Verify Docker Services
```bash
# Check if containers updated
docker ps
docker-compose ps
docker logs codelab-api
```

## Terraform Cloud Integration

### Sync Status
```bash
# Compare Terraform Cloud vs Consul
terraform show -json | jq '.values.root_module.resources[] | select(.type=="consul_key_prefix")'

# Force resync from Terraform Cloud
terraform apply -target=consul_key_prefix.app_config
```

### Update via Terraform Cloud API
```bash
# Update variable
curl -X PATCH \
  -H "Authorization: Bearer $TF_TOKEN" \
  -H "Content-Type: application/vnd.api+json" \
  https://app.terraform.io/api/v2/vars/var-xxx \
  -d '{"data":{"attributes":{"value":"0.2.9"}}}'

# Trigger run
curl -X POST \
  -H "Authorization: Bearer $TF_TOKEN" \
  https://app.terraform.io/api/v2/runs \
  -d '{"data":{"type":"runs","workspace":{"data":{"id":"ws-xxx"}}}}'
```

## Disaster Recovery

### Consul Server Down
```bash
# Services continue running with last known config
# Fix Consul server, services auto-reconnect
```

### Consul-Template Crash
```bash
systemctl restart consul-template
# Immediately syncs and updates if needed
```

### Complete Consul Data Loss
```bash
# Re-run Terraform to repopulate
terraform apply -target=consul_key_prefix.app_config
```

## Best Practices

### DO ✅
- Use Terraform Cloud for permanent changes
- Use Consul UI for temporary testing
- Monitor Consul health regularly
- Keep Terraform Cloud as source of truth

### DON'T ❌
- Make permanent changes only in Consul
- Forget to sync changes back to Terraform
- Disable Consul-Template service
- Store secrets in plain text (use Vault later)

## Quick Reference

| Task | Command |
|------|---------|
| Update Docker version | `consul kv put config/docker/api_tag_version "0.2.9"` |
| Check current version | `consul kv get config/docker/api_tag_version` |
| View all config | `consul kv get -recurse config/` |
| Restart template | `systemctl restart consul-template` |
| Check logs | `journalctl -u consul-template -f` |
| Verify services | `docker ps && consul members` |
| Access UI | `http://<consul-server-ip>:8500` |

## Workflow Decision Tree

```
Need to update config?
├─ Permanent change?
│  ├─ Yes → Update in Terraform Cloud → Apply
│  └─ No → Update in Consul directly
└─ Emergency?
   ├─ Yes → Update Consul now, sync TF later
   └─ No → Follow normal TF workflow
```