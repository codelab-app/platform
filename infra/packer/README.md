# Codelab Packer Images

This directory contains Packer templates for building DigitalOcean snapshots used by the Codelab platform.

## Overview

We use two optimized base images:
- **App Base**: For stateless application services (API, Web, Landing, Sites)
- **Neo4j Base**: For Neo4j database with specialized monitoring and backup tools

Each image contains:
- Docker & Docker Compose
- Consul (can run as server or client)
- Consul-Template
- DigitalOcean CLI (doctl)

The actual role is determined at runtime via minimal user_data scripts.

## Benefits

1. **Faster Deployments**: Software is pre-installed, reducing boot time from ~10 minutes to ~1 minute
2. **Consistency**: All droplets use the same base image, ensuring consistency
3. **Reliability**: Reduces deployment failures from package downloads/installations
4. **Cost Efficiency**: Less time running during provisioning = lower costs
5. **Version Control**: Image versions are tracked and can be rolled back

## Building Images

### Prerequisites

1. Install Packer:
```bash
brew install packer
```

2. Set your DigitalOcean API token:
```bash
export DIGITALOCEAN_API_TOKEN="your-token-here"
```

### Build Commands

Using the Codelab CLI:

```bash
# Build app base image
pnpm cli packer build app

# Build neo4j base image  
pnpm cli packer build neo4j

# Build all images
pnpm cli packer build all

# Build with force flag (rebuild even if exists)
pnpm cli packer build app --force

# Build with debug output
pnpm cli packer build app --debug
```

This will:
1. Create a temporary droplet in DigitalOcean (s-2vcpu-4gb for faster builds)
2. Install all required software
3. Create a snapshot
4. Destroy the temporary droplet

The snapshots will be named:
- Services Base: `codelab-services-base-YYYY-MM-DD-HHMM`
- API: `codelab-api-base-YYYY-MM-DD-HHMM`
- Web: `codelab-web-base-YYYY-MM-DD-HHMM`
- Landing: `codelab-landing-base-YYYY-MM-DD-HHMM`
- Sites: `codelab-sites-base-YYYY-MM-DD-HHMM`
- Neo4j: `codelab-neo4j-base-YYYY-MM-DD-HHMM`

### Additional CLI Commands

```bash
# Validate Packer templates
pnpm cli packer validate app
pnpm cli packer validate neo4j

# List Packer-built images in DigitalOcean
pnpm cli packer list-images

# Clean old images (keeps latest 3)
pnpm cli packer clean-images --dry-run  # Preview what would be deleted
pnpm cli packer clean-images             # Actually delete old images

# Format Packer HCL files
pnpm cli packer fmt
pnpm cli packer fmt --check  # Check formatting without changes
```

### Automated Builds

Images should be rebuilt:
- Monthly for security updates
- When updating core software versions (Docker, Consul, etc.)
- Before major deployments

Add to CI/CD pipeline:
```yaml
packer-build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - uses: hashicorp/setup-packer@v2
    - run: pnpm install && pnpm cli packer build all
      env:
        DIGITALOCEAN_API_TOKEN: ${{ secrets.DIGITALOCEAN_API_TOKEN }}
```

## Using Images in Terraform

Terraform automatically finds the latest image using a data source:

```hcl
# For app services (API, Web, Landing, Sites)
data "digitalocean_image" "services_base" {
  name_regex  = "^codelab-services-base-.*"
  region      = var.digitalocean_region
  most_recent = true
}

# For Neo4j database
data "digitalocean_image" "neo4j_base" {
  name_regex  = "^codelab-neo4j-base-.*"
  region      = var.digitalocean_region
  most_recent = true
}

resource "digitalocean_droplet" "api" {
  image = data.digitalocean_image.services_base.id
  # ... other configuration
}

resource "digitalocean_droplet" "neo4j" {
  image = data.digitalocean_image.neo4j_base.id
  # ... other configuration
}
```

## Image Contents

### Pre-installed Software

| Software | Version | Purpose |
|----------|---------|---------|
| Docker | Latest | Container runtime |
| Docker Compose | 2.24.0 | Container orchestration |
| Consul | 1.17.1 | Service mesh & configuration |
| Consul-Template | 0.34.0 | Dynamic configuration |
| doctl | 1.104.0 | DigitalOcean CLI |

### Directory Structure

```
/etc/consul.d/          # Consul configuration (populated at runtime)
/opt/consul/            # Consul data directory
/etc/consul-template/   # Consul-Template configuration
/root/docker/           # Docker Compose files
/root/.config/doctl/    # DigitalOcean CLI config
```

### Systemd Services

- `docker.service` - Enabled and started
- `consul.service` - Enabled at build, started at runtime
- `consul-template.service` - Enabled at build, started at runtime

## Runtime Configuration

Each droplet type has a minimal init script that:
1. Writes Consul configuration (server or client mode)
2. Configures Consul-Template watches
3. Starts services
4. Pulls Docker images and starts containers

Example runtime overhead:
- Old (with package installation at runtime): ~10 minutes
- New (Packer + init): ~1 minute

## Maintenance

### Updating Software Versions

Edit the respective Packer template:
- Services Base: `infra/packer/modules/services-base/services-base.pkr.hcl`
- Services: `infra/packer/modules/services/services.pkr.hcl`
- Neo4j: `infra/packer/neo4j/codelab-neo4j-base.pkr.hcl`

```hcl
variable "docker_compose_version" {
  default = "2.24.0"  # Update version here
}

variable "doctl_version" {
  default = "1.104.0"  # Update version here
}
```

Then rebuild:
```bash
pnpm cli packer build app --force
```

### Cleaning Old Snapshots

Using the CLI:
```bash
# List all Packer-built images
pnpm cli packer list-images

# Clean old images (keeps latest 3 per type)
pnpm cli packer clean-images --dry-run  # Preview first
pnpm cli packer clean-images             # Actually delete
```

Or manually with doctl:
```bash
doctl compute image list --public=false | grep codelab
doctl compute image delete <snapshot-id>
```

Consider keeping the last 3 snapshots for rollback capability.

## Troubleshooting

### Build Failures

1. Check API token:
```bash
echo $DIGITALOCEAN_API_TOKEN
```

2. Validate template:
```bash
pnpm cli packer validate app
pnpm cli packer validate neo4j
```

3. Enable debug logging:
```bash
pnpm cli packer build app --debug
```

### Runtime Issues

SSH into droplet and check:
```bash
# Check Consul status
systemctl status consul
journalctl -u consul -n 50

# Check Consul-Template
systemctl status consul-template
journalctl -u consul-template -n 50

# Check Docker
docker ps
docker-compose -f /root/docker/docker-compose.yml logs
```