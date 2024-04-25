resource "digitalocean_droplet" "codelab_web" {
  image  = "docker-20-04"
  name   = "web"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = templatefile("${path.module}/codelab-web-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
    next_public_web_host      = var.next_public_web_host,
    next_public_api_port      = var.next_public_api_port,
    next_public_api_hostname  = var.next_public_api_hostname,
    auth0_secret              = var.auth0_secret,
    auth0_domain              = var.auth0_domain,
    auth0_client_id           = var.auth0_web_client_id,
    auth0_client_secret       = var.auth0_web_client_secret,
    docker_tag_version        = var.docker_tag_version
  })

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

