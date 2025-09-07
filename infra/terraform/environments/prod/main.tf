/**
 * Production Environment Configuration
 * 
 * IMPORTANT: Consul Server with Integrated Reverse Proxy
 * ======================================================
 * This environment uses the consul-server droplet as both the service discovery
 * system AND the reverse proxy. This dual-purpose design solves the DNS propagation
 * delay problem while minimizing infrastructure costs.
 * 
 * Architecture:
 * 1. The consul-server droplet runs both Consul and Caddy
 * 2. This droplet maintains a stable IP address (never recreated)
 * 3. All DNS records point to the consul-server's IP
 * 4. Caddy on consul-server queries local Consul for service discovery
 * 5. Backend services register with Consul and can change IPs freely
 * 
 * Benefits:
 * - Zero DNS propagation delays during deployments
 * - One less droplet to manage (saves $5-12/month)
 * - Faster service discovery (local Consul queries)
 * - Services can be recreated without affecting routing
 * - No need for expensive static IPs or load balancers
 * 
 * Trade-offs:
 * - Consul server becomes a single point of failure for both routing and service discovery
 * - Slightly higher resource usage on consul-server (but both Consul and Caddy are lightweight)
 */

terraform {
  required_version = ">= 1.13.0"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "1.2.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "5.25.0"
    }

    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.34.1"
    }

    tfe = {
      version = "~> 0.54.0"
    }

    consul = {
      source  = "hashicorp/consul"
      version = "~> 2.20.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "prod"
    }
  }
}
