# Find the latest Packer-built app base image
data "digitalocean_image" "codelab_app_base" {
  name_regex  = "^codelab-app-base-.*"
  region      = var.digitalocean_region
  most_recent = true
}

resource "digitalocean_droplet" "codelab_sites" {
  image  = data.digitalocean_image.codelab_app_base.id
  name   = "sites"
  region = var.digitalocean_region
  size   = "s-1vcpu-1gb-intel"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # No user_data - everything is baked into the image
  droplet_agent = true

  lifecycle {
    create_before_destroy = true
    ignore_changes = []
  }
}
