/**
 * Consul-Terraform Cloud Integration
 * 
 * This file establishes the bridge between Terraform Cloud (source of truth)
 * and Consul KV store (runtime configuration). On every terraform apply,
 * all configuration values are synchronized from Terraform variables to Consul.
 * 
 * Data Flow:
 * 1. Developer updates variable in Terraform Cloud
 * 2. terraform apply runs (manually or via CI/CD)
 * 3. consul_key_prefix resource updates all KV pairs
 * 4. Consul-Template on each droplet detects changes
 * 5. Services reload with new configuration
 * 
 * This approach provides:
 * - Single source of truth (Terraform Cloud)
 * - Zero-downtime updates (via Consul)
 * - Emergency override capability (direct Consul updates)
 * - Audit trail (Terraform Cloud logs all changes)
 */

/**
 * Consul Provider Configuration
 * 
 * Connects to the Consul server using its public IP.
 * In production, consider:
 * - Using private IP with VPN/bastion access
 * - Enabling ACLs with token authentication
 * - Using TLS for encrypted communication
 */
provider "consul" {
  address    = "${module.consul.consul_server_public_ip}:8500"
  datacenter = module.consul.consul_datacenter
}

/**
 * Consul KV Configuration Sync
 * 
 * This resource maintains all application configuration in Consul KV store.
 * Values are sourced from Terraform Cloud variables and modules.
 * 
 * Organization:
 * - config/docker/*    : Container image versions
 * - config/api/*       : API service configuration
 * - config/web/*       : Web application settings
 * - config/auth0/*     : Authentication configuration
 * - config/neo4j/*     : Database connection settings
 * - config/features/*  : Feature flags (can be overridden in Consul)
 * 
 * Update Process:
 * - Normal updates: Change in Terraform Cloud → terraform apply
 * - Emergency updates: Direct Consul KV update → sync back to TF later
 * - Feature flags: Can be toggled directly in Consul UI
 */
resource "consul_key_prefix" "app_config" {
  path_prefix = "config/"
  
  subkeys = {
    # Docker versions - Service-specific tags allow independent updates
    "docker/api_tag_version"     = var.DOCKER_TAG_VERSION
    "docker/web_tag_version"     = var.DOCKER_TAG_VERSION
    "docker/neo4j_tag_version"   = var.DOCKER_TAG_VERSION
    "docker/landing_tag_version" = var.DOCKER_TAG_VERSION
    "docker/sites_tag_version"   = var.DOCKER_TAG_VERSION
    
    # API configuration
    "api/port"     = var.NEXT_PUBLIC_API_PORT
    "api/hostname" = module.codelab_api.codelab_api_hostname
    
    # Web configuration
    "web/host" = var.NEXT_PUBLIC_WEB_HOST
    
    # Auth0 configuration
    "auth0/domain"              = var.AUTH0_DOMAIN
    "auth0/secret"              = var.AUTH0_SECRET
    "auth0/m2m_client_id"       = var.AUTH0_M2M_CLIENT_ID
    "auth0/m2m_client_secret"   = var.AUTH0_M2M_CLIENT_SECRET
    "auth0/web_client_id"       = module.auth0.web_client.id
    "auth0/web_client_secret"   = module.auth0.web_client.client_secret
    
    # Neo4j configuration
    "neo4j/uri"      = module.codelab_neo4j.neo4j_uri
    "neo4j/user"     = var.NEO4J_USER
    "neo4j/password" = var.NEO4J_PASSWORD
    "neo4j/version"  = "enterprise"
    "neo4j/heap_initial_size" = "1G"
    "neo4j/heap_max_size"     = "2G"
    "neo4j/pagecache_size"    = "512M"
    
    # DigitalOcean configuration
    "digitalocean/api_token" = var.DIGITALOCEAN_API_TOKEN
    
    # Environment settings
    "environment"         = var.ENVIRONMENT
    "monitoring/enabled"  = "true"
    
    # Feature flags (can be overridden in Consul UI)
    "features/new_ui"     = "false"
    "features/dark_mode"  = "false"
    "features/beta_api"   = "false"
  }
  
  depends_on = [module.consul]
}