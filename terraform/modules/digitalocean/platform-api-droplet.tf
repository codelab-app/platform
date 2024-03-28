resource "digitalocean_droplet" "platform-api" {
  image  = "docker-20-04"
  name   = "platform-api"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = digitalocean_vpc.codelab_app.id

  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = templatefile("${path.module}/platform-api-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
  })

  # lifecycle {
  #   ignore_changes = [user_data]
  # }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

resource "digitalocean_record" "platform-api" {
  domain = digitalocean_domain.codelab_app.name
  type   = "A"
  name   = "api"
  value  = digitalocean_droplet.platform-api.ipv4_address
  ttl    = 3600
}
