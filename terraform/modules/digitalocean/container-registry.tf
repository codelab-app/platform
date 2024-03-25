resource "digitalocean_container_registry" "codelab" {
  name                   = "codelab"
  subscription_tier_slug = "starter"
}

resource "digitalocean_container_registry_docker_credentials" "codelab" {
  registry_name = digitalocean_container_registry.codelab.name
}

