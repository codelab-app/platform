/**
 * Production Build Orchestrator
 * 
 * This file orchestrates building all images for production in the correct order.
 * It ensures dependencies are built first (app-base) before dependent images.
 * 
 * Usage: packer build builds/prod.pkr.hcl
 * 
 * Build Order:
 * 1. services-base - Base image with Docker, Consul client, common tools
 * 2. consul-server - Consul server configuration (depends on services-base)
 * 3. services - All service images (depends on services-base)
 */

packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.1.1"
      source  = "github.com/digitalocean/digitalocean"
    }
    external = {
      version = ">= 0.0.2"
      source  = "github.com/joomcode/external"
    }
  }
}

# Import variables from modules
variable "do_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

variable "region" {
  type        = string
  description = "DigitalOcean region"
  default     = "sgp1"
}

# Build configurations that reference the modules
# Note: In practice, we'll call each module separately in sequence
# This file serves as documentation of the build order and dependencies

/*
 * Build Order Documentation:
 * 
 * Step 1: Build services-base
 * Command: packer build -var "do_token=$DO_TOKEN" modules/services-base/
 * 
 * Step 2: Build consul-server (depends on services-base)
 * Command: packer build -var "do_token=$DO_TOKEN" modules/consul-server/
 * 
 * Step 3: Build services (depends on services-base)
 * Command: packer build -var "do_token=$DO_TOKEN" modules/services/
 * 
 * The CLI will execute these in sequence when running "packer build all"
 */

# This file acts as a manifest of what gets built for production
# The actual build logic remains in the individual modules