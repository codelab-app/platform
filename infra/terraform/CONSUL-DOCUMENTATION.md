# Consul Infrastructure - Complete Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Documentation](#component-documentation)
3. [Data Flow](#data-flow)
4. [Code Structure](#code-structure)
5. [Configuration Management](#configuration-management)
6. [Operational Procedures](#operational-procedures)
7. [Security Considerations](#security-considerations)
8. [Troubleshooting](#troubleshooting)

## Architecture Overview

### System Design
```
┌─────────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  Terraform Cloud    │   TF    │   Consul Server  │  Watch  │    Droplets     │
│  (Configuration     │ Apply   │   (Runtime KV    │ ◄────── │ (Consul-Template│
│   Source of Truth)  │ ──────► │    Storage)      │         │    Renders)     │
└─────────────────────┘         └──────────────────┘         └─────────────────┘
```

### Key Components

1. **Terraform Cloud**: Stores all configuration variables as source of truth
2. **Consul Server**: Centralized KV store for runtime configuration
3. **Consul Clients**: Run on each droplet, connect to server
4. **Consul-Template**: Watches KV, renders configs, reloads services
5. **Docker Services**: Automatically restart when configuration changes

## Component Documentation

### Consul Server Module (`/modules/consul/`)

**Purpose**: Provisions and configures the central Consul server.

**Key Files**:
- `main.tf`: Droplet provisioning with cloud-init
- `variables.tf`: Module inputs (region, encryption key, etc.)
- `outputs.tf`: Exports server IPs and datacenter
- `backup.tf`: Automated backup to DigitalOcean Spaces

**Cloud-init Process**:
1. Installs Consul from official HashiCorp APT repository
2. Configures server mode with encryption
3. Starts systemd service
4. Enables web UI on port 8500

### Consul-Terraform Sync (`/environments/prod/consul-sync.tf`)

**Purpose**: Bridges Terraform Cloud variables to Consul KV store.

**How it works**:
```hcl
resource "consul_key_prefix" "app_config" {
  # On every terraform apply, syncs all values to Consul
  subkeys = {
    "docker/api_tag_version" = var.DOCKER_TAG_VERSION
    # ... all other configuration
  }
}
```

**Benefits**:
- Single source of truth (Terraform Cloud)
- Automatic synchronization on apply
- Emergency override capability

### Service Consul Integration (`/modules/codelab-api/consul-init.tf`)

**Purpose**: Configures application droplets to use Consul.

**Components**:
1. **Consul Client Config**: Connects to server, registers service
2. **Consul-Template Config**: Watches KV, renders templates
3. **Docker Compose Template**: Uses KV values for container config
4. **Bootstrap Script**: Initial KV population (deprecated with sync)

## Data Flow

### Configuration Update Flow

1. **Developer Updates Terraform Cloud**
   ```
   Terraform Cloud UI → Change DOCKER_TAG_VERSION → Save
   ```

2. **Terraform Apply Syncs to Consul**
   ```hcl
   terraform apply
   # consul_key_prefix resource updates all KV pairs
   ```

3. **Consul-Template Detects Changes**
   ```
   Watches: config/docker/api_tag_version
   Detects: "0.2.8" → "0.2.9"
   ```

4. **Template Re-renders**
   ```yaml
   # From: image: api:0.2.8
   # To:   image: api:0.2.9
   ```

5. **Service Reloads**
   ```bash
   docker-compose up -d --remove-orphans
   # Only changed containers restart
   ```

## Code Structure

### Directory Layout
```
infra/terraform/
├── modules/
│   ├── consul/                    # Consul server module
│   │   ├── main.tf               # Server provisioning
│   │   ├── backup.tf             # Backup automation
│   │   └── templates/            # Configuration templates
│   │       ├── consul-server.hcl.tpl
│   │       └── consul-client.hcl.tpl
│   │
│   ├── codelab-api/
│   │   ├── consul-init.tf       # Consul client setup
│   │   ├── consul-templates/    # Service-specific templates
│   │   │   ├── docker-compose.ctmpl
│   │   │   └── consul-template.hcl
│   │   └── templates/
│   │       └── bootstrap-consul.sh.tpl
│   │
│   └── codelab-web/              # Similar structure
│
└── environments/
    └── prod/
        ├── consul-sync.tf        # TF Cloud → Consul sync
        └── module-consul.tf      # Consul server instantiation
```

## Configuration Management

### KV Store Organization
```
config/
├── docker/
│   ├── api_tag_version          # "0.2.8"
│   ├── web_tag_version          # "0.3.1"
│   └── neo4j_tag_version        # "5.13.0"
├── api/
│   ├── port                     # "4000"
│   └── hostname                 # "http://api.codelab.app"
├── auth0/
│   ├── domain                   # "codelab.auth0.com"
│   ├── m2m_client_id           # "abc123..."
│   └── m2m_client_secret       # "secret..."
├── neo4j/
│   ├── uri                      # "bolt://neo4j:7687"
│   ├── user                     # "neo4j"
│   └── password                 # "password"
└── features/                    # Feature flags
    ├── new_ui                   # "false"
    └── dark_mode                # "false"
```

### Template Syntax

**Consul-Template Functions**:
```hcl
{{ key "config/path" }}          # Get value from KV
{{ key "path" | parseInt }}      # Convert to integer
{{ env "HOSTNAME" }}             # Get environment variable
{{ if key "feature" | parseBool }}...{{ end }}  # Conditional
```

**Example Template**:
```yaml
services:
  api:
    image: api:{{ key "config/docker/api_tag_version" }}
    ports:
      - '{{ key "config/api/port" | parseInt }}:4000'
```

## Operational Procedures

### Normal Update Process
```bash
# 1. Update in Terraform Cloud
# 2. Apply changes
terraform apply

# 3. Verify in Consul
consul kv get config/docker/api_tag_version
```

### Emergency Hotfix
```bash
# Direct update (bypasses Terraform)
consul kv put config/docker/api_tag_version "0.2.7-hotfix"

# Remember to sync back to Terraform Cloud
```

### Service-Specific Updates
```bash
# Update only one service
consul kv put config/docker/web_tag_version "0.3.2"
```

### Feature Flag Toggle
```bash
# Enable feature
consul kv put config/features/new_ui "true"

# Disable feature  
consul kv put config/features/new_ui "false"
```

## Security Considerations

### Current Implementation
- **Gossip Encryption**: All Consul traffic encrypted with shared key
- **Private Networking**: Consul binds to VPC private IPs
- **Backup Encryption**: Backups stored in private DO Spaces

### Production Recommendations
1. **Enable ACLs**: Implement token-based access control
2. **Use TLS**: Encrypt client-server communication
3. **Restrict UI Access**: Limit to VPN or specific IPs
4. **Integrate Vault**: Store secrets in HashiCorp Vault
5. **Audit Logging**: Enable and monitor Consul audit logs

## Troubleshooting

### Common Issues

**Consul-Template Not Updating**:
```bash
# Check status
systemctl status consul-template
journalctl -u consul-template -f

# Test template manually
consul-template -dry -once -config=/etc/consul-template/consul-template.hcl
```

**Service Not Restarting**:
```bash
# Check Docker logs
docker-compose logs
docker ps -a

# Manually trigger update
cd /root/docker && docker-compose up -d
```

**Consul Connection Issues**:
```bash
# Check Consul agent
consul members
consul info

# Verify connectivity
consul catalog services
```

**KV Sync Issues**:
```bash
# Force resync from Terraform
terraform apply -target=consul_key_prefix.app_config

# Compare values
consul kv get -recurse config/ | grep tag_version
```

### Recovery Procedures

**Consul Server Recovery**:
```bash
# Restore from backup
/usr/local/bin/consul-restore.sh 20240315-120000
```

**Complete KV Loss**:
```bash
# Repopulate from Terraform
terraform apply -target=consul_key_prefix.app_config
```

## Benefits Summary

### Compared to Cloud-init
| Aspect | Cloud-init | Consul |
|--------|------------|--------|
| Update Speed | 5-10 minutes | < 30 seconds |
| Downtime | Yes (recreate) | No (reload) |
| Rollback | Complex | Instant |
| Audit Trail | Limited | Full history |
| Emergency Updates | SSH required | UI/CLI/API |

### Key Advantages
1. **Zero-downtime updates**: Services reload, not recreate
2. **Instant rollback**: Change value back immediately
3. **Centralized management**: All config in one place
4. **Emergency escape hatch**: Bypass Terraform when needed
5. **Service discovery**: Built-in health checking

## Future Enhancements

- [ ] Multi-region Consul federation
- [ ] HashiCorp Vault integration for secrets
- [ ] Consul Connect service mesh
- [ ] Automated canary deployments
- [ ] GitOps integration with Flux/ArgoCD