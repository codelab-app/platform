# API module for prod environment
module "codelab_api" {
  source = "../../modules/codelab-api"

  # Infrastructure dependencies
  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id

  # Variables
  digitalocean_region       = local.digitalocean_region
  digitalocean_api_token    = var.DIGITALOCEAN_API_TOKEN
  digitalocean_droplet_name = var.DIGITALOCEAN_DROPLET_NAME
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN

  # Auth0
  auth0_domain = var.AUTH0_DOMAIN

  # Neo4j
  neo4j_uri      = module.codelab_neo4j.neo4j_uri
  neo4j_user     = var.NEO4J_USER
  neo4j_password = var.NEO4J_PASSWORD

  # Docker
  docker_tag_version = var.DOCKER_TAG_VERSION

  # API config
  next_public_api_port = var.NEXT_PUBLIC_API_PORT

  # Monitoring
  loki_url = var.LOKI_URL

  # Module-specific
  codelab_api_key = var.CODELAB_API_KEY
  codelab_api_crt = var.CODELAB_API_CRT
}