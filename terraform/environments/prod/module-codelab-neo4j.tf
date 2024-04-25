module "codelab_neo4j" {
  source = "../../modules/codelab-neo4j"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN

  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id

  neo4j_user     = var.NEO4J_USER
  neo4j_password = var.NEO4J_PASSWORD
  # neo4j_uri      = var.NEO4J_URI
}
