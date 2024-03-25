resource "digitalocean_container_registry" "codelab" {
  name                   = "codelabapp"
  subscription_tier_slug = "starter"
  region = "sfo2"
}

resource "digitalocean_container_registry_docker_credentials" "codelab" {
  registry_name = digitalocean_container_registry.codelab.name
}

