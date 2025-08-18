#!/bin/bash
# Build service-specific Packer images
# Usage: ./build-services.sh [service] [stage]
# Services: api, web, landing, sites, neo4j, all
# Stage: prod (DigitalOcean) or dev (local Docker)

set -e

SERVICE=${1:-api}
STAGE=${2:-prod}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Building $SERVICE image for $STAGE${NC}"

# Load DigitalOcean token from .env if needed
if [ "$STAGE" = "prod" ]; then
    if [ -z "$DIGITALOCEAN_TOKEN" ]; then
        if [ -f "../../.env" ]; then
            export $(grep -v '^#' ../../.env | grep DIGITALOCEAN_TOKEN | xargs)
        fi
    fi
    
    if [ -z "$DIGITALOCEAN_TOKEN" ]; then
        echo -e "${RED}Error: DIGITALOCEAN_TOKEN not found${NC}"
        exit 1
    fi
fi

build_service() {
    local service=$1
    echo -e "${BLUE}Building $service...${NC}"
    
    cd "$service"
    
    if [ "$STAGE" = "prod" ]; then
        packer build -var "do_token=$DIGITALOCEAN_TOKEN" "codelab-${service}-base.pkr.hcl"
    else
        # For dev builds, use Docker template if it exists
        if [ -f "codelab-${service}-base-docker.pkr.hcl" ]; then
            packer build "codelab-${service}-base-docker.pkr.hcl"
        else
            echo -e "${YELLOW}No Docker template for $service, skipping dev build${NC}"
        fi
    fi
    
    cd ..
    echo -e "${GREEN}✓ $service built successfully${NC}"
}

case $SERVICE in
    api|web|landing|sites|neo4j)
        build_service "$SERVICE"
        ;;
    all)
        for svc in api web landing sites neo4j; do
            if [ -d "$svc" ]; then
                build_service "$svc"
            fi
        done
        ;;
    *)
        echo -e "${RED}Unknown service: $SERVICE${NC}"
        echo "Usage: $0 [api|web|landing|sites|neo4j|all] [prod|dev]"
        exit 1
        ;;
esac

echo -e "${GREEN}Build complete!${NC}"