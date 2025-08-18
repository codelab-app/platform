module "consul" {
  source = "../../modules/consul"
  
  digitalocean_region       = local.digitalocean_region
  vpc_id                    = module.codelab.codelab_app_vpc_id
  consul_encryption_key     = var.CONSUL_ENCRYPT_KEY
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}

# Output for other modules to use
output "consul_server_ip" {
  value = module.consul.consul_server_private_ip
}

output "consul_datacenter" {
  value = module.consul.consul_datacenter
}