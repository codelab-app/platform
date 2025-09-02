# Packer Services Directory

## Structure

All Packer image configurations are stored in this single directory to enable:
1. **Shared variables** - `common.pkr.hcl` defines variables used by all images
2. **Parallel builds** - Packer can build multiple sources in parallel when they're in the same directory
3. **Simplified CLI** - No need for complex path handling

## Files

- `common.pkr.hcl` - Shared variables and data sources (MUST be in same directory)
- `base.pkr.hcl` - Base image with Docker, Consul, and core tools
- `api.pkr.hcl` - API service image
- `consul-server.pkr.hcl` - Consul server image
- `grafana.pkr.hcl` - Grafana monitoring image
- `landing.pkr.hcl` - Landing page service image
- `neo4j.pkr.hcl` - Neo4j database image
- `sites.pkr.hcl` - Sites service image
- `web.pkr.hcl` - Web application image

## Packer Limitation

**Important**: All `.pkr.hcl` files must be in the same directory for:
- Variable sharing (Packer only loads variables from files in the current directory)
- Parallel builds (Packer can only parallelize sources defined in the same build context)

## Building Images

### Single Image
```bash
pnpm cli packer build api
```

### Multiple Images (Sequential)
```bash
pnpm cli packer build api web landing
```

### Parallel Builds
When Packer builds multiple sources from the same directory, it automatically parallelizes them:
```bash
# This would build all services in parallel if we supported it in CLI
cd infra/packer/images/services
packer build -only='digitalocean.api,digitalocean.web,digitalocean.landing' .
```

Currently, our CLI builds images sequentially for better error handling and cleanup management.

## Why This Structure?

1. **No subdirectories** - Packer doesn't recursively load `.pkr.hcl` files from subdirectories
2. **Shared configuration** - All images can use variables defined in `common.pkr.hcl`
3. **Simpler maintenance** - One location for all image definitions
4. **Future parallel builds** - Structure supports parallel builds if we want to enable them