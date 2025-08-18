module "codelab_landing" {
  source = "../../modules/codelab-landing"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region

  docker_tag_version = var.DOCKER_TAG_VERSION

  loki_url = var.LOKI_URL

  next_public_web_host = var.NEXT_PUBLIC_WEB_HOST

  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id
  
  # Consul configuration
  consul_server_ip      = module.consul.consul_server_private_ip
  consul_datacenter     = module.consul.consul_datacenter
  consul_encryption_key = var.CONSUL_ENCRYPT_KEY
}
