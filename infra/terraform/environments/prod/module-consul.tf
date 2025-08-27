/**
 * Consul Provider Configuration
 * 
 * IMPORTANT: For Terraform Cloud
 * Since Terraform Cloud runs remotely, we can't use localhost or environment variables.
 * The provider needs the actual Consul server IP to write KV configuration.
 * 
 * Two-stage apply process:
 * 1. First apply with -target=module.consul creates the server
 * 2. Second apply uses the server's IP to write configuration to Consul KV
 */
provider "consul" {
  # Must use actual server IP for Terraform Cloud (runs remotely, can't use localhost)
  address    = "${module.consul.consul_server_public_ip}:8500"
  datacenter = "dc1"
}

module "consul" {
  source = "../../modules/consul"
  
  digitalocean_region       = local.digitalocean_region
  vpc_id                    = module.codelab.codelab_app_vpc_id
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}

/**
 * Consul KV Configuration Sync
 *
 * Maintains all application configuration in Consul KV store.
 * Values are sourced from Terraform Cloud variables and modules.
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
    "auth0/domain"            = var.AUTH0_DOMAIN
    "auth0/secret"            = var.AUTH0_SECRET
    "auth0/m2m_client_id"     = var.AUTH0_M2M_CLIENT_ID
    "auth0/m2m_client_secret" = var.AUTH0_M2M_CLIENT_SECRET
    "auth0/web_client_id"     = module.auth0.web_client.id
    "auth0/web_client_secret" = module.auth0.web_client.client_secret

    # Neo4j configuration
    "neo4j/uri"               = module.codelab_neo4j.neo4j_uri
    "neo4j/user"              = var.NEO4J_USER
    "neo4j/password"          = var.NEO4J_PASSWORD
    "neo4j/version"           = "enterprise"
    "neo4j/heap_initial_size" = "1G"
    "neo4j/heap_max_size"     = "2G"
    "neo4j/pagecache_size"    = "512M"

    # DigitalOcean configuration
    "digitalocean/api_token" = var.DIGITALOCEAN_API_TOKEN

    # Environment settings
    "environment"        = var.ENVIRONMENT
    "monitoring/enabled" = "true"

    # Feature flags (can be overridden in Consul UI)
    "features/new_ui"    = "false"
    "features/dark_mode" = "false"
    "features/beta_api"  = "false"
  }

  depends_on = [module.consul]
}