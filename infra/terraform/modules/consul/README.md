# Consul Configuration Management

This module sets up HashiCorp Consul for dynamic configuration management, replacing cloud-init for runtime config updates.

## Architecture

```
┌─────────────────┐
│  Consul Server  │ ← KV Store (configuration)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│  API  │ │  Web  │ ← Consul Clients + Consul-Template
└───────┘ └───────┘
```

## Benefits over Cloud-init

### Cloud-init (Previous)
- ❌ Only runs once at instance creation
- ❌ Requires droplet destroy/recreate for config changes
- ❌ Manual SSH required for updates

### Consul (Current)
- ✅ Real-time configuration updates
- ✅ Zero downtime config changes
- ✅ Graceful service reloads via systemctl
- ✅ Centralized configuration management
- ✅ Version control for configs (can rollback)

## Components

### 1. Consul Server
- Central KV store for all configuration
- Web UI available at `http://<consul-server-ip>:8500`
- Stores service configurations, environment variables, etc.

### 2. Consul Clients
- Run on each application droplet (API, Web, etc.)
- Connect to Consul server for configuration
- Register services for health checking

### 3. Consul-Template
- Watches for changes in Consul KV store
- Renders configuration templates (docker-compose.yml)
- Gracefully reloads services when configs change

## Usage

### Initial Setup

1. Generate encryption key:
```bash
consul keygen
# Add to terraform.tfvars as CONSUL_ENCRYPT_KEY
```

2. Deploy Consul server:
```bash
terraform apply -target=module.consul
```

3. Deploy application droplets:
```bash
terraform apply
```

### Updating Configuration

1. **Via Consul UI**:
```bash
# Access UI
open http://<consul-server-ip>:8500/ui

# Navigate to Key/Value
# Update any config value
# Services automatically reload
```

2. **Via CLI**:
```bash
# SSH to any droplet with Consul
consul kv put config/docker/tag_version "0.2.7"
consul kv put config/api/port "4001"
```

3. **Via API**:
```bash
curl -X PUT http://<consul-server-ip>:8500/v1/kv/config/docker/tag_version \
  -d "0.2.7"
```

### Configuration Structure

```
config/
├── docker/
│   └── tag_version          # Docker image version
├── api/
│   └── port                 # API port number
├── auth0/
│   ├── domain              # Auth0 domain
│   ├── m2m_client_id       # Machine-to-machine client ID
│   └── m2m_client_secret   # M2M client secret
├── neo4j/
│   ├── uri                 # Neo4j connection URI
│   ├── user                # Neo4j username
│   └── password            # Neo4j password
└── digitalocean/
    └── api_token           # DO API token
```

### Service Reload Process

When a configuration changes:

1. Consul-Template detects the change
2. Renders new docker-compose.yml
3. Runs: `docker-compose up -d --remove-orphans`
4. Docker gracefully updates only changed services
5. No downtime for unchanged services

### Monitoring

Check Consul health:
```bash
consul members
consul operator raft list-peers
```

Check Consul-Template:
```bash
systemctl status consul-template
journalctl -u consul-template -f
```

View current configuration:
```bash
consul kv get -recurse config/
```

### Troubleshooting

**Consul not starting:**
```bash
journalctl -u consul -f
consul validate /etc/consul.d/
```

**Consul-Template not updating:**
```bash
systemctl restart consul-template
tail -f /var/log/syslog | grep consul-template
```

**Services not reloading:**
```bash
docker-compose logs
docker ps
```

## Security Considerations

1. **Encryption**: All Consul traffic is encrypted with gossip key
2. **Private Network**: Consul only binds to private VPC IPs
3. **ACLs**: Can be enabled for production (currently disabled)
4. **Secrets**: Consider using Vault integration for sensitive data

## Future Enhancements

- [ ] Enable ACLs for production
- [ ] Integrate HashiCorp Vault for secrets
- [ ] Set up Consul Connect for service mesh
- [ ] Add backup/restore procedures
- [ ] Implement multi-datacenter replication