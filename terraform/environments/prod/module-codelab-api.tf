module "codelab_api" {
  source = "../../modules/codelab-api"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  docker_tag_version        = var.DOCKER_TAG_VERSION

  loki_url = var.LOKI_URL

  auth0_domain = var.AUTH0_DOMAIN

  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id

  neo4j_user     = var.NEO4J_USER
  neo4j_password = var.NEO4J_PASSWORD
  neo4j_uri      = module.codelab_neo4j.neo4j_uri

  next_public_api_port = var.NEXT_PUBLIC_API_PORT
}
