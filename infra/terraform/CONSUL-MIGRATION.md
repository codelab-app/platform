# Consul Migration - From Cloud-init to Dynamic Configuration

## Architecture Overview

```
┌─────────────────┐
│  Consul Server  │
│   (Central KV)  │
└────────┬────────┘
         │
    ┌────┴────────────────────┬──────────────┬─────────────┐
    │                         │              │             │
┌───▼───────────────┐ ┌──────▼────────┐ ┌──▼──────┐ ┌────▼────┐
│  API Droplet      │ │ Web Droplet   │ │ Neo4j   │ │ Sites   │
├───────────────────┤ ├───────────────┤ ├─────────┤ ├─────────┤
│ • Consul Client   │ │ • Consul      │ │ • ...   │ │ • ...   │
│ • Consul-Template │ │ • Consul-Temp │ │         │ │         │
│ • /api/templates  │ │ • /web/temps  │ │         │ │         │
└───────────────────┘ └───────────────┘ └─────────┘ └─────────┘
```

## Key Design Decisions

### 1. Service-Specific Templates
Each module maintains its own Consul templates:
- `/modules/codelab-api/consul-templates/`
- `/modules/codelab-web/consul-templates/`
- `/modules/codelab-neo4j/consul-templates/`

**Why**: Keeps configuration close to the code, follows Terraform module best practices.

### 2. Service-Specific Tag Versions
Instead of a single `config/docker/tag_version`, we use:
- `config/docker/api_tag_version`
- `config/docker/web_tag_version`
- `config/docker/neo4j_tag_version`

**Why**: Services can be updated independently without affecting others.

### 3. Consul-Template Per Service
Each service has its own:
- `docker-compose.ctmpl` - Service-specific container config
- `consul-template.hcl` - Template rendering configuration
- `bootstrap-consul.sh.tpl` - Initial KV population script

**Why**: Complete isolation between services, no cross-contamination.

## Migration Benefits

### Before (Cloud-init)
```bash
# Change needed? Destroy and recreate droplet!
terraform destroy -target=module.codelab_api
terraform apply -target=module.codelab_api
# 10+ minutes downtime
```

### After (Consul)
```bash
# Change needed? Update KV store!
consul kv put config/docker/api_tag_version "0.2.8"
# 30 seconds, zero downtime
```

## File Structure

```
infra/terraform/modules/
├── consul/                       # Consul server module
│   ├── main.tf
│   ├── templates/
│   │   ├── consul-server.hcl.tpl
│   │   ├── consul-client.hcl.tpl
│   │   └── consul-template.service
│   └── scripts/
│       └── install-consul.sh
│
├── codelab-api/
│   ├── consul-init.tf           # Consul configuration
│   ├── consul-templates/        # API-specific templates
│   │   ├── docker-compose.ctmpl
│   │   └── consul-template.hcl
│   └── templates/
│       └── bootstrap-consul.sh.tpl
│
├── codelab-web/
│   ├── consul-init.tf
│   ├── consul-templates/        # Web-specific templates
│   │   ├── docker-compose.ctmpl
│   │   └── consul-template.hcl
│   └── templates/
│       └── bootstrap-consul.sh.tpl
```

## Usage Examples

### 1. Update Docker Image Version
```bash
# API only
consul kv put config/docker/api_tag_version "0.2.9"

# Web only  
consul kv put config/docker/web_tag_version "0.3.0"
```

### 2. Change Configuration
```bash
# Update API port
consul kv put config/api/port "4001"

# Update Neo4j connection
consul kv put config/neo4j/uri "bolt://new-neo4j:7687"
```

### 3. Feature Flags
```bash
# Enable feature for all services
consul kv put config/features/new_ui "true"
```

### 4. Emergency Rollback
```bash
# Quick rollback to previous version
consul kv put config/docker/api_tag_version "0.2.7"
# Service automatically pulls old image and restarts
```

## Deployment Steps

1. **Generate Consul encryption key**:
```bash
consul keygen
# Add to terraform.tfvars as CONSUL_ENCRYPT_KEY
```

2. **Deploy Consul server first**:
```bash
terraform apply -target=module.consul
```

3. **Deploy services**:
```bash
terraform apply
```

4. **Verify Consul cluster**:
```bash
ssh consul-server
consul members
consul kv get -recurse config/
```

## Monitoring & Troubleshooting

### Check Service Health
```bash
consul catalog services
consul catalog nodes -service=api
```

### Watch Config Changes
```bash
consul watch -type=key -key=config/docker/api_tag_version cat
```

### Debug Consul-Template
```bash
journalctl -u consul-template -f
consul-template -dry -once -config=/etc/consul-template/consul-template.hcl
```

### View Current Configuration
```bash
consul kv get -recurse config/ | grep -E "(tag_version|port)"
```

## Security Considerations

1. **Encryption**: All Consul traffic encrypted with gossip key
2. **Private Network**: Consul only accessible within VPC
3. **Secrets**: Consider Vault integration for sensitive data
4. **ACLs**: Can be enabled for production (currently disabled for simplicity)

## Next Steps

- [ ] Enable Consul ACLs for production
- [ ] Integrate HashiCorp Vault for secrets management
- [ ] Set up Consul Connect for service mesh
- [ ] Add Consul backup/restore automation
- [ ] Implement canary deployments using Consul KV