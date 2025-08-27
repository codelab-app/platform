# Find the latest Packer-built web base image
data "digitalocean_images" "codelab_web_base" {
  filter {
    key    = "name"
    values = ["codelab-web-base"]
    match_by = "substring"
  }
  filter {
    key    = "regions"
    values = [var.digitalocean_region]
  }
  filter {
    key    = "private"
    values = ["true"]
  }
  sort {
    key       = "created"
    direction = "desc"
  }
}

resource "digitalocean_droplet" "codelab_web" {
  image  = data.digitalocean_images.codelab_web_base.images[0].id
  name   = "web"
  region = var.digitalocean_region
  size   = "s-1vcpu-1gb-intel"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Tags for firewall rules
  tags = ["consul-client"]

  # No user_data - everything is baked into the image
  droplet_agent = true

  lifecycle {
    create_before_destroy = false
    ignore_changes = []
  }
}
