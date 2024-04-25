resource "digitalocean_droplet" "codelab_landing" {
  image  = "docker-20-04"
  name   = "landing"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  # Need to be in same VPC since
  vpc_uuid = var.codelab_app_vpc_id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = templatefile("${path.module}/landing-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
    docker_tag_version        = var.docker_tag_version
  })

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true

  # tags = ["landing"]
}


