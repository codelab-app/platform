module "consul" {
  source = "../../modules/consul"
  
  digitalocean_region       = local.digitalocean_region
  vpc_id                    = module.codelab.codelab_app_vpc_id
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}

# Output for other modules to use
output "consul_server_ip" {
  value = module.consul.consul_server_private_ip
}

output "consul_server_public_ip" {
  value = module.consul.consul_server_public_ip
}