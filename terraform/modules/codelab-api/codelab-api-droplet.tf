resource "digitalocean_droplet" "codelab_api" {
  image  = "docker-20-04"
  name   = "api"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = data.cloudinit_config.api.rendered

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

locals {
  enable_ssl   = false
  api_protocol = local.enable_ssl ? "https" : "http"
  local_port   = local.enable_ssl ? 443 : 80
}

output "codelab_api_hostname" {
  value = "${local.api_protocol}://${digitalocean_droplet.codelab_api.ipv4_address_private}"
}
