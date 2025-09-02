# Find the latest Packer-built Grafana base image
data "digitalocean_images" "grafana_base" {
  filter {
    key      = "name"
    values   = ["codelab-grafana-base"]
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

resource "digitalocean_droplet" "grafana" {
  image  = data.digitalocean_images.grafana_base.images[0].id
  name   = "grafana"
  region = var.digitalocean_region
  size   = "s-1vcpu-2gb-intel"  # Grafana/Loki needs more RAM

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  # SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Tags for firewall rules
  tags = ["consul-client", "monitoring"]

  droplet_agent = true

  lifecycle {
    create_before_destroy = false
  }
}