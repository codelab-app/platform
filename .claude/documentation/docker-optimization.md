# Docker Image Optimization & Caching Strategies

## Problem
- Landing image is 674MB compressed (likely 1.5-2GB uncompressed)
- DigitalOcean Registry downloads large layers very slowly (<1MB/s for 500MB+ layers)
- This causes deployment failures and long startup times

## Solutions Implemented

### 1. Pre-pull Images in Packer
Images are now pulled during Packer build and cached in the snapshot:
- Eliminates slow pulls on droplet boot
- Images are already present when docker-compose runs
- Trade-off: Larger snapshots, but faster deployments

### 2. Recommendations for Image Size Reduction

#### Use Multi-stage Builds
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage  
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
```

#### Optimize Dockerfile Layers
```dockerfile
# Good: Combine RUN commands
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Bad: Multiple RUN commands create multiple layers
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2
```

#### Use BuildKit Cache Mounts
```dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production
```

### 3. Additional Caching Options

#### Local Registry Mirror (Not implemented yet)
Set up a pull-through cache on a dedicated droplet:
```bash
docker run -d -p 5000:5000 \
  -e REGISTRY_PROXY_REMOTEURL=https://registry.digitalocean.com \
  --restart always \
  --name registry-cache \
  registry:2
```

#### Use Docker Layer Caching in CI
- GitHub Actions: Use `docker/build-push-action` with cache
- CircleCI: Use Docker Layer Caching feature
- BuildKit: Export/import cache between builds

### 4. Monitoring Image Sizes
Check image sizes regularly:
```bash
# List images with sizes
docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}"

# Analyze image layers
docker history <image> --no-trunc
```

## Next Steps
1. Audit current Dockerfiles for optimization opportunities
2. Implement multi-stage builds for all services
3. Set up CI/CD caching for faster builds
4. Consider Alpine-based images where possible
5. Remove unnecessary dependencies and files from images