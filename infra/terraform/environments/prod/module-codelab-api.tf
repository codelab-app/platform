module "codelab_api" {
  source = "../../modules/codelab-api"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region
  digitalocean_api_token    = var.DIGITALOCEAN_API_TOKEN
  digitalocean_droplet_name = var.DIGITALOCEAN_DROPLET_NAME


  docker_tag_version = var.DOCKER_TAG_VERSION

  loki_url = var.LOKI_URL

  codelab_api_key = var.CODELAB_API_KEY
  codelab_api_crt = var.CODELAB_API_CRT

  auth0_domain            = var.AUTH0_DOMAIN

  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id

  neo4j_user     = var.NEO4J_USER
  neo4j_password = var.NEO4J_PASSWORD
  neo4j_uri      = module.codelab_neo4j.neo4j_uri

  next_public_api_port      = var.NEXT_PUBLIC_API_PORT
  next_public_base_api_path = var.NEXT_PUBLIC_BASE_API_PATH
  
  # Consul configuration
  consul_server_ip   = module.consul.consul_server_private_ip
}
