# Neo4j database module for prod environment
module "codelab_neo4j" {
  source = "../../modules/codelab-neo4j"

  # Infrastructure dependencies
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id

  # DigitalOcean config
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region

  # Neo4j credentials
  neo4j_user     = var.NEO4J_USER
  neo4j_password = var.NEO4J_PASSWORD

  # Monitoring
  loki_url             = var.LOKI_URL
  prometheus_write_url = var.PROMETHEUS_WRITE_URL
  prometheus_username  = var.PROMETHEUS_USERNAME
  prometheus_password  = var.PROMETHEUS_PASSWORD
}