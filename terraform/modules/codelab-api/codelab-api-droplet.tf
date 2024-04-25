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
  user_data = templatefile("${path.module}/codelab-api-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
    # Not used
    auth0_m2m_client_id     = "",
    auth0_m2m_client_secret = "",
    neo4j_uri               = var.neo4j_uri,
    neo4j_user              = var.neo4j_user,
    neo4j_password          = var.neo4j_password
    docker_tag_version      = var.docker_tag_version
    auth0_domain            = var.auth0_domain
  })

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

output "codelab_api_ipv4_address_private" {
  value = digitalocean_droplet.codelab_api.ipv4_address_private
}

